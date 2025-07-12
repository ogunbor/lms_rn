import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";

const Checkout = () => {
    const router = useRouter();
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <ScreenHeader title={"Checkout"} returnScreen={'/screens/base/Cart'} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {courses.map((c, index) => (
                        <View className="flex-row gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3" key={index}>
                            <Image source={require('../../../assets/images/handshake.jpg')} className="h-[100px] w-[100px] rounded-md object-cover" />
                            <View>
                                <Text className="text-[18px] font-bold"> Python Programming...</Text>
                                <Text className="text-[18px] font-normal mt-1"> $1.99</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
            <View>
                <View className="bg-gray-200 p-2 rounded-md mt-2">
                    <Text className="text-[18px] font-semibold mb-4"> Summary</Text>
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-[15px] font-semibold"> Sub Total</Text>
                        <Text className="text-[15px] font-normal"> $20.4</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-[15px] font-semibold"> Tax</Text>
                        <Text className="text-[15px] font-normal"> $2.4</Text>
                    </View>
                    <View className="flex-row items-center justify-between mb-1 mt-2">
                        <Text className="text-[17px] font-semibold"> Total</Text>
                        <Text className="text-[17px] font-normal"> $120.4</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => router.push('/screens/base/Success')} className="bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md mt-2">
                    <Text className="text-white" >Pay With USDC</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    );
}

export default Checkout