import { Platform, StyleSheet } from "react-native";


export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? 40 : 0,
    },
});
