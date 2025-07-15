import { FontAwesome5 } from "@expo/vector-icons";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";

const Dashboard = () => {
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Cart"} returnScreen={'/screens/base/Home'} />
                <Text className="text-[25px] font-bold text-[#32174D]">Dashboard</Text>
                <Text className="text-[15px] font-semibold text-[#5a5a5a]">Welcome to your dashboard</Text>

                <View className="bg-[#e9e9e9a7] rounded-md p-2 flex-row flex-wrap mt-7">
                    <View className="w-full">
                        <View className="bg-[#d5c9e8] h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center">
                            <FontAwesome5 name="book" color={"#32174D"} size={22} />
                            <Text className="text-[18px] font-semibold mb-3 text-[#32174D]"> 2 Courses</Text>
                        </View>
                    </View>
                    <View className="w-1/2">
                        <View className="bg-[#f7d1d1] h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center">
                            <FontAwesome5 name="graduation-cap" color={"#32174D"} size={22} />
                            <Text className="text-[18px] font-semibold mb-3 text-[#32174D]"> 2 Courses</Text>
                        </View>
                    </View>
                    <View className="w-1/2">
                        <View className="bg-[#fdf0c2] h-[70px] rounded-md m-1 pt-2 flex-col justify-center items-center">
                            <FontAwesome5 name="play" color={"#32174D"} size={22} />
                            <Text className="text-[18px] font-semibold mb-3 text-[#32174D]"> 3 not watched</Text>
                        </View>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                    <Text className="text-[25px] font-bold text-[#32174D]">My Courses</Text>
                    <Text className="text-[15px] font-semibold text-[#5a5a5a]">View and manage all your courses</Text>

                    <View className="flex-row gap-2 mt-3 pb-3 w-full bg-[#e9e9e9a7] p-2 rounded-md mb-3" key={1}>
                        <Image source={require('../../../assets/images/handshake.jpg')} className="h-[100px] w-[100px] rounded-md object-cover" />
                        <View className="flex-1 pl-2">
                            <Text className="text-[18px] font-bold text-[#32174D]">Python Programming...</Text>
                            <Text className="text-[16px] text-[#5a5a5a] mt-1">3 sections</Text>
                            <TouchableOpacity className="bg-[#32174D] gap-2 flex-row w-full h-7 flex justify-center items-center rounded-md mt-2">
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

export default Dashboard;
