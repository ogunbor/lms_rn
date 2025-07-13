import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";

const Home = () => {
    const [trendingCourses, setTrendingCourses] = useState([1, 2, 3]);
    const router = useRouter();
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <View className="flex-1">
                    {/* Header section */}
                    <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
                        <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <Image source={require('../../../assets/images/handshake.jpg')} className="h-[40px] w-[40px] rounded-full" />
                                <View>
                                    <Text className="text-[15px] text-white font-normal">Hello 👋</Text>
                                    <Text className="text-[17px] text-white font-semibold">Jerry Charja</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center mx-auto">
                                    <FontAwesome5 name="shopping-cart" color={"#280e49"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center mx-auto">
                                    <FontAwesome5 name="bell" color={"#280e49"} size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('../screens/auth/Login')} className="h-[30px] w-[30px] bg-[#fe3535] rounded-full flex items-center justify-center mx-auto">
                                    <FontAwesome5 name="power-off" color={"#fff"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* end */}
                    <View className="flex-row items-center justify-between bg-[#280e4935] p-2 rounded-full">
                        <TextInput placeholder="Search Courses..." />
                        <TouchableOpacity className="mr-[10px]">
                            <FontAwesome5 name="search" color={"#280e49"} size={15} />
                        </TouchableOpacity>
                    </View>
                    <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
                        <View className="flex-row gap-2 items-center justify-between mb-3">
                            <Text className="text-[17px] font-semibold">Trending Courses</Text>
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-[15px] font-normal">See All</Text>
                                <FontAwesome5 name="arrow-right" color={"#280e49"} size={15} />
                            </View>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {trendingCourses?.map((t, index) => (
                                <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                                    <Image source={require('../../../assets/images/handshake.jpg')} className="h-[200px] w-[300px] rounded-md object-cover" />
                                    <View>
                                        <Text className="text-[20px] text-[#280e49] font-semibold mt-2">Rust Crash Course</Text>
                                        <Text className="text-[15px] text-[#280e49] font-normal mt-1">Jeff Japajam</Text>
                                        <View className="flex-row items-center gap-1 mt-1">
                                            <Text>4/5</Text>
                                            <View className="flex-row items-center gap-1 mt-1">
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                            </View>
                                            <Text>2 reviews</Text>
                                        </View>
                                        <View className="flex-row items-center justify-between">
                                            <Text className="text-[22px] font-bold mt-3">30.34</Text>
                                            <View className="flex-row items-center gap-2">
                                                <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                                                    <Text className="text-white">View Course</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                                                    <FontAwesome5 name="shopping-cart" color={"#fff"} size={15} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
                        <View className="flex-row gap-2 items-center justify-between mb-3">
                            <Text className="text-[17px] font-semibold">Popular Courses</Text>
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-[15px] font-normal">See All</Text>
                                <FontAwesome5 name="arrow-right" color={"#280e49"} size={15} />
                            </View>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {trendingCourses?.map((t, index) => (
                                <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                                    <Image source={require('../../../assets/images/handshake.jpg')} className="h-[200px] w-[300px] rounded-md object-cover" />
                                    <View>
                                        <Text className="text-[20px] text-[#280e49] font-semibold mt-2">Rust Crash Course</Text>
                                        <Text className="text-[15px] text-[#280e49] font-normal mt-1">Jeff Japajam</Text>
                                        <View className="flex-row items-center gap-1 mt-1">
                                            <Text>4/5</Text>
                                            <View className="flex-row items-center gap-1 mt-1">
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                            </View>
                                            <Text>2 reviews</Text>
                                        </View>
                                        <View className="flex-row items-center justify-between">
                                            <Text className="text-[22px] font-bold mt-3">30.34</Text>
                                            <View className="flex-row items-center gap-2">
                                                <TouchableOpacity onPress={() => router.push('/screens/base/CourseDetail')} className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                                                    <Text className="text-white">View Course</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => router.push('/screens/base/Cart')} className="bg-[#280e49] rounded-md w-30 flex items-center justify-center p-2">
                                                    <FontAwesome5 name="shopping-cart" color={"#fff"} size={15} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            {/* Bottom Navigation */}
            <BottomScreenNavigation />

        </View>
    );
}

export default Home