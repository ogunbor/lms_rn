import { useRouter } from "expo-router";
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
                        placeholder="Full Name"
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />
                    <TextInput
                        placeholder="Email"
                        keyboardType="email-address"
                        style={{
                            backgroundColor: "#fff",
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
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        style={{
                            backgroundColor: "#fff",
                            borderColor: "#e8e8e8",
                            borderWidth: 1,
                            borderRadius: 8,
                            padding: 12,
                            marginBottom: 16,
                            color: "#2f2f2f",
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            backgroundColor: "#32174D",
                            paddingVertical: 14,
                            borderRadius: 8,
                            alignItems: "center",
                            marginTop: 12,
                        }}
                    >
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Create Account</Text>
                    </TouchableOpacity>

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
