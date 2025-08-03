import { useRouter } from "expo-router";
import { useState, useRef, useEffect } from "react";
import { login } from "../../../src/utils/auth";
import { useDispatch } from "react-redux";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    StatusBar
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CartId from "../../../src/plugin/CartId";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

const Login = () => {
    const [bioData, setBioData] = useState({ email: "jerrycharja@gmail.com", password: "Testing321" });
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Animation refs
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        // Start entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const handleBioData = (name, value) => {
        setBioData({
            ...bioData,
            [name]: value,
        });

        // Clear errors when user starts typing
        if (name === 'email' && emailError) setEmailError("");
        if (name === 'password' && passwordError) setPasswordError("");
    };

    const validateForm = () => {
        let isValid = true;

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!bioData.email) {
            setEmailError("Email is required");
            isValid = false;
        } else if (!emailRegex.test(bioData.email)) {
            setEmailError("Please enter a valid email");
            isValid = false;
        }

        // Password validation
        if (!bioData.password) {
            setPasswordError("Password is required");
            isValid = false;
        } else if (bioData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        }

        return isValid;
    };

    const generateCartId = async () => {
        const generateRandomString = async () => {
            const length = 30;
            const characters = "abcdefghiklmnopqrstuvwxzy1234567890";
            let randomString = "";

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomString += characters.charAt(randomIndex);
            }
            await AsyncStorage.setItem("randomString", randomString);
        };

        const existingRandomString = await AsyncStorage.getItem("randomString");
        console.log("existingRandomString =====", existingRandomString);
        if (!existingRandomString) {
            generateRandomString();
        }
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        setLoading(true);

        // Add a slight delay for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            const { error } = await login(dispatch, bioData.email, bioData.password);
            if (error) {
                Alert.alert(
                    "Login Failed 😞",
                    error.detail || "Invalid email or password. Please try again.",
                    [{ text: "OK", style: "default" }]
                );
                setLoading(false);
            } else {
                // Success animation
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]).start();

                Alert.alert(
                    "Welcome Back! 🎉",
                    "Login successful! Redirecting to home...",
                    [
                        {
                            text: "Continue",
                            onPress: () => {
                                setLoading(false);
                                router.push("/screens/base/Home");
                                CartId();
                                generateCartId();
                            }
                        }
                    ]
                );
            }
        } catch (error) {
            console.log(error);
            Alert.alert(
                "Connection Error 📡",
                "Unable to connect to server. Please check your internet connection and try again.",
                [{ text: "OK", style: "default" }]
            );
            setLoading(false);
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1a0d2e" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, backgroundColor: "#f8fafc" }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingHorizontal: 20,
                        }}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Header with Gradient Background */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                                height: height * 0.4,
                                marginHorizontal: -20,
                                marginBottom: 30,
                                borderBottomLeftRadius: 30,
                                borderBottomRightRadius: 30,
                                overflow: 'hidden',
                                position: 'relative'
                            }}
                        >
                            <Image
                                source={require("../../../assets/images/login_image.jpg")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute'
                                }}
                                resizeMode="cover"
                            />
                            {/* Gradient Overlay */}
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(50, 23, 77, 0.7)',
                                }}
                            />

                            {/* Welcome Text */}
                            <View style={{
                                position: 'absolute',
                                bottom: 40,
                                left: 20,
                                right: 20
                            }}>
                                <Text style={{
                                    fontSize: 32,
                                    fontWeight: "bold",
                                    color: "white",
                                    textAlign: 'center'
                                }}>
                                    Welcome Back! 👋
                                </Text>
                                <Text style={{
                                    fontSize: 16,
                                    color: "rgba(255,255,255,0.9)",
                                    textAlign: 'center',
                                    marginTop: 8
                                }}>
                                    Sign in to continue your learning journey
                                </Text>
                            </View>
                        </Animated.View>

                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ scale: scaleAnim }],
                            }}
                        >
                            {/* Email Input */}
                            <View style={{ marginBottom: 20 }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: 8,
                                    marginLeft: 4
                                }}>
                                    Email Address
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderColor: emailFocused ? "#32174D" : (emailError ? "#ef4444" : "#e5e7eb"),
                                        borderWidth: 2,
                                        borderRadius: 16,
                                        paddingHorizontal: 16,
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <FontAwesome5
                                        name="envelope"
                                        size={16}
                                        color={emailFocused ? "#32174D" : "#9ca3af"}
                                        style={{ marginRight: 12 }}
                                    />
                                    <TextInput
                                        onChangeText={(text) => handleBioData("email", text)}
                                        value={bioData.email}
                                        placeholder="Enter your email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholderTextColor="#9ca3af"
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={() => setEmailFocused(false)}
                                        style={{
                                            flex: 1,
                                            paddingVertical: 16,
                                            color: "#1f2937",
                                            fontSize: 16,
                                        }}
                                    />
                                </View>
                                {emailError ? (
                                    <Text style={{
                                        color: '#ef4444',
                                        fontSize: 12,
                                        marginTop: 4,
                                        marginLeft: 4
                                    }}>
                                        {emailError}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Password Input */}
                            <View style={{ marginBottom: 32 }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#374151',
                                    marginBottom: 8,
                                    marginLeft: 4
                                }}>
                                    Password
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        backgroundColor: "white",
                                        borderColor: passwordFocused ? "#32174D" : (passwordError ? "#ef4444" : "#e5e7eb"),
                                        borderWidth: 2,
                                        borderRadius: 16,
                                        paddingHorizontal: 16,
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 8,
                                        elevation: 3,
                                    }}
                                >
                                    <FontAwesome5
                                        name="lock"
                                        size={16}
                                        color={passwordFocused ? "#32174D" : "#9ca3af"}
                                        style={{ marginRight: 12 }}
                                    />
                                    <TextInput
                                        onChangeText={(text) => handleBioData("password", text)}
                                        value={bioData.password}
                                        placeholder="Enter your password"
                                        secureTextEntry={!passwordVisible}
                                        placeholderTextColor="#9ca3af"
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={() => setPasswordFocused(false)}
                                        style={{
                                            flex: 1,
                                            paddingVertical: 16,
                                            color: "#1f2937",
                                            fontSize: 16,
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={togglePasswordVisibility}
                                        style={{ padding: 4 }}
                                    >
                                        <Icon
                                            name={passwordVisible ? "eye-off" : "eye"}
                                            size={20}
                                            color={passwordFocused ? "#32174D" : "#9ca3af"}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {passwordError ? (
                                    <Text style={{
                                        color: '#ef4444',
                                        fontSize: 12,
                                        marginTop: 4,
                                        marginLeft: 4
                                    }}>
                                        {passwordError}
                                    </Text>
                                ) : null}
                            </View>

                            {/* Forgot Password */}
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 32 }}>
                                <Text style={{
                                    color: "#32174D",
                                    fontSize: 14,
                                    fontWeight: '600'
                                }}>
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                            {/* Login Button */}
                            <TouchableOpacity
                                onPress={handleLogin}
                                disabled={loading}
                                style={{
                                    backgroundColor: loading ? "#9ca3af" : "#32174D",
                                    paddingVertical: 18,
                                    borderRadius: 16,
                                    alignItems: "center",
                                    marginBottom: 24,
                                    shadowColor: "#32174D",
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: loading ? 0 : 0.3,
                                    shadowRadius: 8,
                                    elevation: loading ? 0 : 8,
                                    flexDirection: 'row',
                                    justifyContent: 'center'
                                }}
                            >
                                {loading && (
                                    <ActivityIndicator
                                        size="small"
                                        color="white"
                                        style={{ marginRight: 12 }}
                                    />
                                )}
                                <Text style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: 18
                                }}>
                                    {loading ? "Signing In..." : "Sign In"}
                                </Text>
                            </TouchableOpacity>

                            {/* Divider */}
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 24
                            }}>
                                <View style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: '#e5e7eb'
                                }} />
                                <Text style={{
                                    marginHorizontal: 16,
                                    color: '#6b7280',
                                    fontSize: 14
                                }}>
                                    or
                                </Text>
                                <View style={{
                                    flex: 1,
                                    height: 1,
                                    backgroundColor: '#e5e7eb'
                                }} />
                            </View>

                            {/* Social Login Buttons */}
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 32
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        paddingVertical: 14,
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        marginRight: 8,
                                        borderWidth: 1,
                                        borderColor: '#e5e7eb',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FontAwesome5 name="google" size={18} color="#ea4335" />
                                    <Text style={{
                                        marginLeft: 8,
                                        color: '#374151',
                                        fontWeight: '600'
                                    }}>
                                        Google
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        paddingVertical: 14,
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        marginLeft: 8,
                                        borderWidth: 1,
                                        borderColor: '#e5e7eb',
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FontAwesome5 name="apple" size={18} color="#000" />
                                    <Text style={{
                                        marginLeft: 8,
                                        color: '#374151',
                                        fontWeight: '600'
                                    }}>
                                        Apple
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Register Link */}
                            <TouchableOpacity
                                onPress={() => router.push("/screens/auth/Register")}
                                style={{
                                    alignItems: 'center',
                                    paddingVertical: 16
                                }}
                            >
                                <Text style={{
                                    textAlign: "center",
                                    color: "#6b7280",
                                    fontSize: 16
                                }}>
                                    Don't have an account?{" "}
                                    <Text style={{
                                        color: "#32174D",
                                        fontWeight: 'bold'
                                    }}>
                                        Sign Up
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    );
};

export default Login;