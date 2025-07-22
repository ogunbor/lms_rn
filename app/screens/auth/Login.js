import { useRouter } from "expo-router";
import { useState } from "react";
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
    View
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import CartId from "../../../src/plugin/CartId";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
    const [bioData, setBioData] = useState({ email: "jerrycharja@gmail.com", password: "Testing321" });
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

    const router = useRouter();
    const dispatch = useDispatch();

    const handleBioData = (name, value) => {
        setBioData({
            ...bioData,
            [name]: value,
        });
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
        setLoading(true);

        try {
            const { error } = await login(dispatch, bioData.email, bioData.password);
            if (error) {
                alert(error.detail);
                setLoading(false);
            } else {
                //console.log("Login Success");
                setLoading(false);
                router.push("/screens/base/Home");
                CartId();
                generateCartId();
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 16,
                        paddingTop: 40,
                        paddingBottom: 20
                    }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <Image
                        source={require("../../../assets/images/login_image.jpg")}
                        style={{ width: "100%", height: 250, borderRadius: 12 }}
                        resizeMode="cover"
                    />

                    <Text style={{ fontSize: 32, fontWeight: "bold", color: "#32174D", marginTop: 24 }}>
                        Login
                    </Text>
                    <Text style={{ fontSize: 16, color: "#5a5a5a", marginBottom: 24 }}>
                        Welcome back! Login to continue
                    </Text>

                    <TextInput
                        onChangeText={(text) => handleBioData("email", text)}
                        value={bioData.email}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="#888"
                        style={{
                            backgroundColor: "#e9e9e9a7",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 30,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />

                    {/* Password Field with Icon */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: "#e9e9e9a7",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 30,
                            paddingHorizontal: 12,
                            marginBottom: 35,
                        }}
                    >
                        <TextInput
                            onChangeText={(text) => handleBioData("password", text)}
                            value={bioData.password}
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            placeholderTextColor="#888"
                            style={{
                                flex: 1,
                                paddingVertical: 12,
                                color: "#2f2f2f",
                            }}
                        />
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <Icon
                                name={passwordVisible ? "eye-off" : "eye"}
                                size={20}
                                color="#32174D"
                            />
                        </TouchableOpacity>
                    </View>

                    {loading === true ? (
                        <TouchableOpacity
                            disabled
                            style={{
                                backgroundColor: "#32174D",
                                paddingVertical: 14,
                                borderRadius: 30,
                                alignItems: "center",
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Processing...</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={handleLogin}
                            style={{
                                backgroundColor: "#32174D",
                                paddingVertical: 14,
                                borderRadius: 30,
                                alignItems: "center",
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Login</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        onPress={() => router.push("/screens/auth/Register")}
                        style={{ marginTop: 24 }}
                    >
                        <Text style={{ textAlign: "center", color: "#32174D", fontSize: 14 }}>
                            Don't have an account yet?{" "}
                            <Text style={{ textDecorationLine: "underline" }}>Register</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;
