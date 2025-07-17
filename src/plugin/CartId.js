import AsyncStorage from "@react-native-async-storage/async-storage";

function CartId() {
    const generateRandomString = async () => {
        const length = 30;
        const characters = "ABCDEFGIJKLMNOPQRSTUVWXYZ1234567890";
        let randomString = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        AsyncStorage.setItem("randomString", randomString);
        console.log(randomString);
    };

    const existingRandomString = AsyncStorage.getItem("randomString");
    if (!existingRandomString) {
        generateRandomString();
    } else {
    }

    return existingRandomString;
}

export default CartId;
