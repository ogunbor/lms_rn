import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";

const Cart = () => {
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <ScreenHeader title={"Cart"} returnScreen={'/screens/base/Home'} />
                {courses.map((c, index) => (
                    <View className="flex-row gap-2 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3" key={index}>
                        <Image source={require('../../../assets/images/handshake.jpg')} className="h-[100px] w-[100px] rounded-md object-cover" />
                        <View>
                            <Text className="text-[18px] font-bold"> Python Programming...</Text>
                            <Text className="text-[18px] font-normal mt-1"> $1.99</Text>
                            <TouchableOpacity className="bg-[#280e49] w-7 h-7 flex justify-center items-center rounded-md mt-2">
                                <FontAwesome5 name="trash" color={"white"} size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
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

                <TouchableOpacity className="bg-[#280e49] w-[100%] flex-row justify-center p-2 rounded-md mt-2">
                    <Text className="text-white" >Proceed To Checkout</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    );
}

export default Cart