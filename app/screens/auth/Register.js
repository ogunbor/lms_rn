import { useRouter } from "expo-router";
import { useState } from "react";
import apiInstance from "../../../src/utils/axios"
import { login } from "../../../src/utils/auth"
import { useDispatch } from "react-redux"
import Icon from "react-native-vector-icons/Ionicons";

import {
    Image,
    Keyboard,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const Register = () => {
    const router = useRouter();
    const [bioData, setBioData] = useState({ full_name: "", email: "", password: "", password2: "" });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

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

    const handleRegister = async () => {
        setLoading(true);

        try {
            const userData = {
                full_name: bioData.full_name,
                email: bioData.email,
                password: bioData.password,
                password2: bioData.password2,
            };
            const response = await apiInstance.post(`user/register/`, userData);

            if (response.status === 201) {
                // console.log("No error########", response.data);
                const { error } = await login(dispatch, bioData.email, bioData.password);
                if (error) {
                } else {
                    // console.log("Login successs ######");
                    router.push("/screens/base/Home");
                    generateCartId();
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);

            if (error.response.data.email) {
                alert(error.response.data.email);
            }

            if (error.response.data.password) {
                alert(error.response.data.password);
            }
        }
    };

    const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <View style={{ flex: 1, backgroundColor: "#F2F2F2", paddingTop: statusBarHeight }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingHorizontal: 16,
                        paddingBottom: 20,
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
                        Register
                    </Text>
                    <Text style={{ fontSize: 16, color: "#5a5a5a", marginBottom: 24 }}>
                        Create an account and start learning
                    </Text>

                    <TextInput
                        onChangeText={(text) => handleBioData("full_name", text)}
                        value={bioData.full_name}
                        placeholder="Full Name"
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 30,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />
                    <TextInput
                        onChangeText={(text) => handleBioData("email", text)}
                        value={bioData.email}
                        placeholder="Email"
                        keyboardType="email-address"
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 30,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />

                    <View style={{ position: "relative", marginBottom: 16 }}>
                        <TextInput
                            onChangeText={(text) => handleBioData("password", text)}
                            value={bioData.password}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            style={{
                                backgroundColor: "#fff",
                                borderColor: "#e8e8e8",
                                borderWidth: 1,
                                borderRadius: 30,
                                padding: 12,
                                paddingRight: 45,
                                color: "#2f2f2f",
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: 15,
                                top: 12,
                            }}
                        >
                            <Icon name={showPassword ? "eye-off" : "eye"} size={20} color="#32174D" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: "relative", marginBottom: 20 }}>
                        <TextInput
                            onChangeText={(text) => handleBioData("password2", text)}
                            value={bioData.password2}
                            placeholder="Confirm Password"
                            secureTextEntry={!showPassword2}
                            style={{
                                backgroundColor: "#fff",
                                borderColor: "#e8e8e8",
                                borderWidth: 1,
                                borderRadius: 30,
                                padding: 12,
                                paddingRight: 45,
                                color: "#2f2f2f",
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword2(!showPassword2)}
                            style={{
                                position: "absolute",
                                right: 15,
                                top: 12,
                            }}
                        >
                            <Icon name={showPassword2 ? "eye-off" : "eye"} size={20} color="#32174D" />
                        </TouchableOpacity>
                    </View>

                    {loading === true ? (
                        <TouchableOpacity
                            disabled
                            onPress={handleRegister}
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
                            onPress={handleRegister}
                            style={{
                                backgroundColor: "#32174D",
                                paddingVertical: 14,
                                borderRadius: 30,
                                alignItems: "center",
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Create Account</Text>
                        </TouchableOpacity>
                    )}


                    <TouchableOpacity
                        onPress={() => router.push("/screens/auth/Login")}
                        style={{ marginTop: 40, marginBottom: 30 }}
                    >
                        <Text style={{ textAlign: "center", color: "#32174D", fontSize: 14 }}>
                            Already have an account?{" "}
                            <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                        </Text>
                    </TouchableOpacity>

                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Register;