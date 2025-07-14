import { FontAwesome5 } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";


const MyCourses = () => {
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Cart"} returnScreen={'/screens/base/Home'} />

                <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                    <Text className="text-[25px] font-bold">My Courses</Text>
                    <Text className="text-[15px] font-bold">View and manage all your courses</Text>

                    <View className="flex-row gap-2 mt-3 pb-3 w-full bg-gray-200 p-2 rounded-md mb-3" key={1}>
                        <Image source={require('../../../assets/images/handshake.jpg')} className="h-[100px] w-[100px] rounded-md object-cover" />
                        <View>
                            <Text className="text-[18px] font-bold"> Python Programming...</Text>
                            <Text className="text-[18px] font-normal mt-1"> 3 sections</Text>
                            <TouchableOpacity className="bg-[#280e49] gap-2 flex-row w-100 h-7 flex justify-center items-center rounded-md mt-2">
                                <Text className="text-white">Start Now</Text>
                                <FontAwesome5 name="play" color={"white"} size={12} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </ScrollView>


            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    )
}

export default MyCourses