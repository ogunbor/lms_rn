import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiInstance from "../../../src/utils/axios";
import { Connection, PublicKey } from '@solana/web3.js';
import { Base64EncodedAddress } from '@solana-mobile/mobile-wallet-adapter-protocol';
import { toUint8Array } from 'js-base64';
import ConnectButton from '../../../src/components/ConnectButton';
import DisconnectButton from "../../../src/components/DisconnectButton";

const Cart = () => {
    const router = useRouter();
    const [cart, setCart] = useState([]);
    const [cartStats, setCartStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [authorization, setAuthorization] = useState(null);

    // ✅ Create Solana connection for mobile
    const connection = new Connection('https://api.devnet.solana.com');

    const fetchCartItems = async () => {
        const cart_id = await AsyncStorage.getItem("randomString");
        setLoading(true);
        try {
            const cart_response = await apiInstance.get(`cart/list/${cart_id}`);
            const cart_stats_response = await apiInstance.get(`cart/stats/${cart_id}`);

            setCart(cart_response.data);
            setCartStats(cart_stats_response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const deleteCartItem = async (cartId, itemId) => {
        const url = `cart/item-delete/${cartId}/${itemId}/`;
        await apiInstance.delete(url);
        fetchCartItems();
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <View className="bg-[#280e49] rounded-2xl mb-3">
                    <ScreenHeader title={"Cart"} returnScreen={'/screens/base/Home'} />
                </View>

                {loading ? (
                    <View>
                        <ActivityIndicator size={"large"} color={"#280e49"} />
                    </View>
                ) : (
                    <View>
                        {cart.map((c, index) => (
                            <View className="flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3" key={index}>
                                <Image source={{ uri: c?.course?.image }} className="h-[100px] w-[100px] rounded-md object-cover" />
                                <View>
                                    <Text className="text-[18px] font-bold">{c?.course?.title?.slice(0, 25)}...</Text>
                                    <View className="flex-row items-center gap-1 mb-2">
                                        <Text className="text-[16px] font-normal leading-5">{c?.price / 1000}</Text>
                                        <Image
                                            source={require('../../../assets/images/solana.png')}
                                            style={{ width: 16, height: 16, resizeMode: 'contain' }}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={() => deleteCartItem(c?.cart_id, c?.id)} className="bg-[#5c3c85] w-7 h-7 flex justify-center items-center rounded-md mt-2">
                                        <FontAwesome5 name="trash" color={"red"} size={13} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

                        {cart?.length < 1 && <Text className="mt-5 ml-4">Empty Cart</Text>}
                    </View>
                )}
            </ScrollView>

            <View>
                <View className="bg-gray-200 p-2 rounded-md mt-2 mb-3">
                    <Text className="text-[18px] font-semibold mb-4"> Summary</Text>
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-[15px] font-semibold"> Sub Total</Text>
                        <Text className="text-[15px] font-normal">{cartStats?.price / 1000}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-[15px] font-semibold"> Tax</Text>
                        <Text className="text-[15px] font-normal">{cartStats?.tax / 1000}</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-1 mt-2">
                        <Text className="text-[17px] font-semibold"> Total</Text>
                        <Text className="text-[17px] font-normal">{cartStats?.total / 1000} sol</Text>
                    </View>
                </View>

                {/* ✅ Connect or Disconnect wallet */}
                {authorization === null ? (
                    <ConnectButton
                        onConnect={async (authorization) => {
                            setAuthorization(authorization);
                            // router.push('/screens/base/Checkout');
                        }}
                        label="Connect wallet to pay"
                    />
                ) : (
                    <DisconnectButton
                        authorization={authorization}
                        onDisconnect={() => setAuthorization(null)}
                    />
                )}
            </View>

            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    );
};

export default Cart;
