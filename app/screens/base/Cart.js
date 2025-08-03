import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../../../src/utils/axios";
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import ConnectButton from '../../../src/components/ConnectButton';
import DisconnectButton from "../../../src/components/DisconnectButton";
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

const { width } = Dimensions.get('window');

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [cartStats, setCartStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authorization, setAuthorization] = useState(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [deletingItems, setDeletingItems] = useState(new Set());

    // Animation values
    const [fadeAnim] = useState(new Animated.Value(0));
    const [slideAnim] = useState(new Animated.Value(50));

    // Multiple RPC endpoints for better reliability
    const RPC_ENDPOINTS = [
        'https://api.devnet.solana.com',
        'https://devnet.helius-rpc.com/?api-key=demo',
        'https://rpc-devnet.helius.xyz/?api-key=demo',
        'https://solana-devnet.g.alchemy.com/v2/demo'
    ];

    const [currentRpcIndex, setCurrentRpcIndex] = useState(0);
    const connection = new Connection(RPC_ENDPOINTS[currentRpcIndex], {
        commitment: 'confirmed',
        confirmTransactionInitialTimeout: 60000,
    });

    const fetchCartItems = async () => {
        const cart_id = await AsyncStorage.getItem("randomString");
        setLoading(true);
        try {
            const cart_response = await apiInstance.get(`cart/list/${cart_id}`);
            const cart_stats_response = await apiInstance.get(`cart/stats/${cart_id}`);
            setCart(cart_response.data);
            setCartStats(cart_stats_response.data);

            // Animate in content
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const deleteCartItem = async (cartId, itemId) => {
        setDeletingItems(prev => new Set([...prev, itemId]));

        Alert.alert(
            "Remove Course",
            "Are you sure you want to remove this course from your cart?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => setDeletingItems(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(itemId);
                        return newSet;
                    })
                },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const url = `cart/item-delete/${cartId}/${itemId}/`;
                            await apiInstance.delete(url);
                            fetchCartItems();
                        } catch (error) {
                            console.log("Error deleting item:", error);
                            Alert.alert("Error", "Failed to remove item from cart");
                        } finally {
                            setDeletingItems(prev => {
                                const newSet = new Set(prev);
                                newSet.delete(itemId);
                                return newSet;
                            });
                        }
                    }
                }
            ]
        );
    };

    const clearCart = async () => {
        try {
            const cart_id = await AsyncStorage.getItem("randomString");
            await fetchCartItems();
        } catch (error) {
            console.log("Error clearing cart:", error);
        }
    };

    // Function to try different RPC endpoints
    const tryWithFallbackRPC = async (operation, maxRetries = 3) => {
        let lastError = null;

        for (let rpcIndex = 0; rpcIndex < RPC_ENDPOINTS.length; rpcIndex++) {
            for (let retry = 0; retry < maxRetries; retry++) {
                try {
                    const tempConnection = new Connection(RPC_ENDPOINTS[rpcIndex], {
                        commitment: 'confirmed',
                        confirmTransactionInitialTimeout: 60000,
                    });

                    const result = await operation(tempConnection);
                    setCurrentRpcIndex(rpcIndex); // Update to working RPC
                    return result;
                } catch (error) {
                    lastError = error;
                    console.log(`RPC ${RPC_ENDPOINTS[rpcIndex]} attempt ${retry + 1} failed:`, error.message);

                    // Wait before retry
                    if (retry < maxRetries - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000 * (retry + 1)));
                    }
                }
            }
        }

        throw lastError;
    };

    const handlePayment = async (authorization) => {
        if (!cartStats?.total || cartStats.total <= 0) {
            Alert.alert("Error", "Cart is empty or invalid total amount.");
            return;
        }

        setIsProcessingPayment(true);

        try {
            const { publicKey } = authorization;

            // Debug: Log the original cart total
            console.log("Cart Stats:", cartStats);
            console.log("Cart Total (raw):", cartStats.total);

            // More robust conversion - handle different possible formats
            let amountInLamports;

            // If cartStats.total is already in lamports (large number)
            if (cartStats.total > 1000000) {
                amountInLamports = Math.floor(cartStats.total);
                console.log("Assuming total is already in lamports:", amountInLamports);
            } else {
                // If cartStats.total is in SOL (small decimal)
                amountInLamports = Math.floor(cartStats.total * 1000000000);
                console.log("Converting SOL to lamports:", cartStats.total, "SOL =", amountInLamports, "lamports");
            }

            const recipient = new PublicKey("HbGRPd1SGqXbhQ2ocBDL5aC9Phs8aAsrjUjWWRkWTjpS");

            // Check balance with fallback RPC endpoints
            const balance = await tryWithFallbackRPC(async (conn) => {
                return await conn.getBalance(publicKey);
            });

            // Debug: Show balance comparison
            const balanceInSOL = balance / 1000000000;
            const amountInSOL = amountInLamports / 1000000000;

            console.log("Wallet balance:", balance, "lamports (", balanceInSOL.toFixed(6), "SOL)");
            console.log("Required amount:", amountInLamports, "lamports (", amountInSOL.toFixed(6), "SOL)");

            if (balance < amountInLamports) {
                Alert.alert(
                    "Insufficient Funds 💰",
                    `You need ${amountInSOL.toFixed(6)} SOL but only have ${balanceInSOL.toFixed(6)} SOL.`,
                    [
                        {
                            text: "Check Balance",
                            onPress: () => {
                                Alert.alert("Balance Details",
                                    `Wallet: ${publicKey.toString().slice(0, 8)}...\n` +
                                    `Balance: ${balanceInSOL.toFixed(6)} SOL\n` +
                                    `Cart Total: ${cartStats.total}\n` +
                                    `Required: ${amountInSOL.toFixed(6)} SOL`
                                );
                            }
                        },
                        { text: "OK", style: "cancel" }
                    ]
                );
                return;
            }

            // Create timeout promise to prevent hanging
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Transaction timeout after 45 seconds')), 45000)
            );

            const transactionPromise = transact(async (wallet) => {
                // Get fresh blockhash with fallback RPC
                const { blockhash, lastValidBlockHeight } = await tryWithFallbackRPC(async (conn) => {
                    return await conn.getLatestBlockhash('confirmed');
                });

                // Create transaction
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: publicKey,
                        toPubkey: recipient,
                        lamports: amountInLamports,
                    })
                );

                transaction.recentBlockhash = blockhash;
                transaction.feePayer = publicKey;

                // Sign transaction
                const signedTx = await wallet.signTransaction(transaction);

                // Send with fallback RPC
                const txid = await tryWithFallbackRPC(async (conn) => {
                    return await conn.sendRawTransaction(signedTx.serialize(), {
                        skipPreflight: false,
                        preflightCommitment: 'confirmed',
                        maxRetries: 3
                    });
                });

                // Confirm with fallback RPC
                await tryWithFallbackRPC(async (conn) => {
                    return await conn.confirmTransaction({
                        signature: txid,
                        blockhash: blockhash,
                        lastValidBlockHeight: lastValidBlockHeight
                    }, 'confirmed');
                });

                return txid;
            });

            // Race between transaction and timeout
            const txid = await Promise.race([transactionPromise, timeoutPromise]);

            console.log("Transaction successful:", txid);
            Alert.alert(
                "Payment Successful! 🎉",
                `Your courses have been purchased successfully!\nTransaction ID: ${txid.slice(0, 8)}...`,
                [
                    {
                        text: "View Courses",
                        onPress: () => {
                            clearCart();
                            router.push("/screens/student/Dashboard");
                        }
                    }
                ]
            );

        } catch (error) {
            console.error("Payment failed:", error);

            // Handle specific error types with better UX
            if (error?.message?.includes('Network request failed') ||
                error?.message?.includes('failed to get balance') ||
                error?.message?.includes('fetch')) {
                Alert.alert(
                    "Network Error 📡",
                    "Unable to connect to Solana network. Please check your internet connection and try again.",
                    [
                        {
                            text: "Retry",
                            onPress: () => handlePayment(authorization)
                        },
                        {
                            text: "Cancel",
                            style: "cancel"
                        }
                    ]
                );
            } else if (error?.message?.includes('CLOSED') || error?.message?.includes('closed')) {
                Alert.alert(
                    "Connection Error 🔌",
                    "Wallet connection was closed. Please reconnect and try again.",
                    [
                        {
                            text: "OK",
                            onPress: () => setAuthorization(null)
                        }
                    ]
                );
            } else if (error?.message?.includes('insufficient funds')) {
                Alert.alert("Insufficient Funds 💸", "You don't have enough SOL to complete this transaction.");
            } else if (error?.message?.includes('timeout')) {
                Alert.alert("Transaction Timeout ⏱️", "The transaction took too long. Please try again.");
            } else if (error?.message?.includes('User rejected')) {
                Alert.alert("Transaction Cancelled ❌", "You cancelled the transaction.");
            } else {
                Alert.alert(
                    "Payment Failed 😞",
                    error?.message || "An unexpected error occurred. Please try again."
                );
            }
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const CartItem = ({ item, index }) => (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
            }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
        >
            <View className="flex-row p-4">
                <View className="relative">
                    <Image
                        source={{ uri: item?.course?.image }}
                        className="h-24 w-24 rounded-lg"
                        style={{ resizeMode: 'cover' }}
                    />
                    <View className="absolute -top-2 -right-2 bg-[#280e49] rounded-full w-6 h-6 flex items-center justify-center">
                        <Text className="text-white text-xs font-bold">{index + 1}</Text>
                    </View>
                </View>

                <View className="flex-1 ml-4 justify-between">
                    <View>
                        <Text className="text-lg font-bold text-gray-800 mb-1" numberOfLines={2}>
                            {item?.course?.title}
                        </Text>
                        <Text className="text-sm text-gray-500 mb-2">By Jerry Charja</Text>

                        <View className="flex-row items-center bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-2 rounded-lg">
                            <Image
                                source={require('../../../assets/images/solana.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                            <Text className="text-xl font-bold text-[#280e49] ml-2">
                                {(item?.price / 1000).toFixed(3)}
                            </Text>
                            <Text className="text-sm text-gray-600 ml-1">SOL</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => deleteCartItem(item?.cart_id, item?.id)}
                    disabled={deletingItems.has(item?.id)}
                    className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center ml-2"
                >
                    {deletingItems.has(item?.id) ? (
                        <ActivityIndicator size="small" color="#ef4444" />
                    ) : (
                        <FontAwesome5 name="trash-alt" color="#ef4444" size={16} />
                    )}
                </TouchableOpacity>
            </View>
        </Animated.View>
    );

    const EmptyCart = () => (
        <Animated.View
            style={{ opacity: fadeAnim }}
            className="flex-1 justify-center items-center py-16"
        >
            <View className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mb-6">
                <FontAwesome5 name="shopping-cart" size={40} color="#9ca3af" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</Text>
            <Text className="text-gray-500 text-center mb-8 px-8">
                Looks like you haven't added any courses yet. Explore our catalog to find amazing courses!
            </Text>
            <TouchableOpacity
                onPress={() => router.push('/screens/base/Home')}
                className="bg-[#280e49] px-8 py-4 rounded-full flex-row items-center"
            >
                <FontAwesome5 name="search" color="white" size={16} />
                <Text className="text-white font-semibold ml-2">Browse Courses</Text>
            </TouchableOpacity>
        </Animated.View>
    );

    const PriceBreakdown = () => (
        <Animated.View
            style={{ opacity: fadeAnim }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4"
        >
            <View className="flex-row items-center mb-4">
                <AntDesign name="calculator" size={20} color="#280e49" />
                <Text className="text-lg font-bold text-gray-800 ml-2">Order Summary</Text>
            </View>

            <View className="space-y-3">
                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">Subtotal ({cart.length} {cart.length === 1 ? 'course' : 'courses'})</Text>
                    <View className="flex-row items-center">
                        <Text className="text-gray-800 font-medium">
                            {((cartStats?.price ?? 0) / 1000).toFixed(3)}
                        </Text>
                        <Text className="text-gray-500 text-sm ml-1">SOL</Text>
                    </View>
                </View>

                <View className="flex-row justify-between items-center">
                    <Text className="text-gray-600">Platform fee</Text>
                    <View className="flex-row items-center">
                        <Text className="text-gray-800 font-medium">
                            {((cartStats?.tax ?? 0) / 1000).toFixed(3)}
                        </Text>
                        <Text className="text-gray-500 text-sm ml-1">SOL</Text>
                    </View>
                </View>

                <View className="border-t border-gray-200 pt-3">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-lg font-bold text-gray-800">Total</Text>
                        <View className="flex-row items-center bg-[#280e49] px-3 py-2 rounded-lg">
                            <Image
                                source={require('../../../assets/images/solana.png')}
                                style={{ width: 18, height: 18, resizeMode: 'contain' }}
                            />
                            <Text className="text-xl font-bold text-white ml-2">
                                {((cartStats?.total ?? 0) / 1000).toFixed(3)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Animated.View>
    );

    return (
        <View className="bg-gray-50 flex-1">
            {/* Header */}
            <View className="bg-[#280e49] rounded-b-3xl mb-4 shadow-lg">
                <ScreenHeader title={"Shopping Cart"} returnScreen={'/screens/base/Home'} />
                {cart.length > 0 && (
                    <View className="px-4 pb-4">
                        <Text className="text-white/80 text-center">
                            {cart.length} {cart.length === 1 ? 'course' : 'courses'} in your cart
                        </Text>
                    </View>
                )}
            </View>

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {loading ? (
                    <View className="flex-1 justify-center items-center py-16">
                        <ActivityIndicator size="large" color="#280e49" />
                        <Text className="mt-4 text-gray-600 text-lg">Loading your cart...</Text>
                    </View>
                ) : cart.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <View>
                        {/* Cart Items */}
                        <View className="mb-6">
                            {cart.map((item, index) => (
                                <CartItem key={item.id} item={item} index={index} />
                            ))}
                        </View>

                        {/* Price Breakdown */}
                        <PriceBreakdown />

                        {/* Payment Section */}
                        <Animated.View style={{ opacity: fadeAnim }}>
                            {authorization === null ? (
                                <ConnectButton
                                    label="🔗 Connect Wallet to Complete Purchase"
                                    onConnect={async (authorization) => {
                                        setAuthorization(authorization);
                                        await handlePayment(authorization);
                                    }}
                                    disabled={isProcessingPayment}
                                />
                            ) : (
                                <View className="space-y-3">
                                    {isProcessingPayment ? (
                                        <View className="bg-amber-500 p-5 rounded-xl flex-row justify-center items-center">
                                            <ActivityIndicator size="small" color="white" />
                                            <Text className="text-white font-bold text-lg ml-3">
                                                Processing Payment...
                                            </Text>
                                        </View>
                                    ) : (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => handlePayment(authorization)}
                                                className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl shadow-lg"
                                            >
                                                <View className="flex-row items-center justify-center">
                                                    <FontAwesome5 name="credit-card" color="white" size={20} />
                                                    <Text className="text-white font-bold text-lg ml-3">
                                                        Pay {((cartStats?.total ?? 0) / 1000).toFixed(3)} SOL
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>

                                            <DisconnectButton
                                                authorization={authorization}
                                                onDisconnect={() => setAuthorization(null)}
                                            />
                                        </>
                                    )}
                                </View>
                            )}
                        </Animated.View>
                    </View>
                )}
            </ScrollView>

            <BottomScreenNavigation />
        </View>
    );
};

export default Cart;