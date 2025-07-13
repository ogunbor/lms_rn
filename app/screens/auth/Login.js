import { useRouter } from "expo-router";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";

const Login = () => {
    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingTop: 40, paddingBottom: 20 }}
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
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="#888"
                        style={{
                            backgroundColor: "#e9e9e9a7",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="#888"
                        style={{
                            backgroundColor: "#e9e9e9a7",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 20,
                            color: "#2f2f2f",
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#32174D",
                            paddingVertical: 14,
                            borderRadius: 8,
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Login</Text>
                    </TouchableOpacity>

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
