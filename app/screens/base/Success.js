import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";

const Success = () => {
    const [courses, setCourses] = useState([1, 2, 3, 4, 5])
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <ScreenHeader title={"Success"} returnScreen={'/screens/base/Home'} />

                <View className="flex-col items-center gap-2 pb-3 mr-2 bg-gray-200 p-2 rounded-md mb-3 mt-10">
                    <FontAwesome5 name="check-circle" color={"#280e49"} size={105} />
                    <View>
                        <Text className="text-[18px]">Enrollment Successful</Text>
                        <TouchableOpacity className="bg-[#280e49]" p-2 rounded-md mt-4>
                            <Text className="text-white text-center">Go to dashboard</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    );
}

export default Success