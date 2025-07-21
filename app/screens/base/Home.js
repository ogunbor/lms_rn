import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import { logout } from "../../../src/utils/auth"
import { useDispatch } from "react-redux";
import apiInstance from "../../../src/utils/axios";

const Home = () => {
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch()

    const logoutUser = async () => {
        logout(dispatch);
        router.push("/screens/auth/Login");
    }

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await apiInstance.get(`course/course-list/`);
            console.log(response.data.length);
            setTrendingCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const renderStars = (count) => {
        return Array.from({ length: count }, (_, i) => (
            <AntDesign key={i} name="star" color={"#dba100"} size={15} />
        ));
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <View className="flex-1">
                    {/* Header section */}
                    <View className="bg-[#280e49] p-4 rounded-2xl mb-4">
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
                                <TouchableOpacity onPress={logoutUser} className="h-[30px] w-[30px] bg-[#fe3535] rounded-full flex items-center justify-center mx-auto">
                                    <FontAwesome5 name="power-off" color={"#fff"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {/* end */}

                    {/* Search Bar */}
                    <View className="bg-[#280e4915] flex-row items-center rounded-full px-4 py-2 mb-4">
                        <TextInput
                            placeholder="Search Courses..."
                            className="flex-1 text-sm"
                        />
                        <FontAwesome5 name="search" size={16} color="#280e49" />
                    </View>

                    {/* {Trending Courses} */}
                    <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
                        <View className="flex-row gap-2 items-center justify-between mb-3">
                            <Text className="text-lg font-bold">Trending Courses</Text>
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-[15px] font-normal">See All</Text>
                                <FontAwesome5 name="arrow-right" color={"#280e49"} size={15} />
                            </View>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {loading === false ? (
                                <>
                                    {trendingCourses?.map((t, index) => (
                                        <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                                            <Image source={{ uri: t.image }} className="h-[200px] w-full rounded-md object-cover" />
                                            <View>
                                                <Text className="text-[#280e49] font-bold text-lg mt-2">
                                                    {t.title}
                                                </Text>
                                                <Text className="text-[15px] text-[#280e49] font-normal mt-1">Jerry Charja</Text>
                                                <View className="flex-row items-center mt-1 gap-1 mb-2">
                                                    <Text className="text-xs text-gray-600">
                                                        {t.average_rating || 0}/5
                                                    </Text>
                                                    <View className="flex-row">{renderStars(t.average_rating)}</View>
                                                    {/* <View className="flex-row items-center gap-5 mt-1">
                                                        <Text>
                                                            {t?.average_rating === 1 ? (
                                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                            ) : t?.average_rating === 2 ? (
                                                                <>
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                </>
                                                            ) : t?.average_rating === 3 ? (
                                                                <>
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                </>
                                                            ) : t?.average_rating === 4 ? (
                                                                <>
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                </>
                                                            ) : t?.average_rating === 5 ? (
                                                                <>
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                    <AntDesign name="star" color={"#dba100"} size={15} />
                                                                </>
                                                            ) : (
                                                                <Text></Text>
                                                            )}
                                                        </Text>
                                                    </View> */}
                                                    <Text className="text-gray-600">
                                                        {t?.rating_count === 0
                                                            ? 'No review yet'
                                                            : `${t?.rating_count} ${t?.rating_count === 1 ? 'review' : 'reviews'}`}
                                                    </Text>
                                                </View>
                                                <View className="flex-row justify-between items-center mt-3">
                                                    <Text className="text-[18px] font-bold mt-3">{t?.price / 1000} sol</Text>
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
                                </>
                            ) : (
                                <>
                                    <ActivityIndicator size={"small"} color={"#280e49"} />
                                </>
                            )}

                        </ScrollView>
                    </View>

                    {/* Popular Courses */}
                    <View className="bg-[#280e4935] p-2 rounded-[8px] mt-3 mb-3">
                        <View className="flex-row gap-2 items-center justify-between mb-3">
                            <Text className="text-lg font-bold">Popular Courses</Text>
                            <View className="flex-row gap-2 items-center">
                                <Text className="text-[15px] font-normal">See All</Text>
                                <FontAwesome5 name="arrow-right" color={"#280e49"} size={15} />
                            </View>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {trendingCourses?.map((t, index) => (
                                <View className="bg-white w-[300px] p-3 mr-2 rounded-md" key={index}>
                                    <Image source={require('../../../assets/images/rustlang.jpg')} className="h-[200px] w-[280px] rounded-md object-cover" />
                                    <View>
                                        <Text className="text-[#280e49] font-bold text-lg mt-2">
                                            Rust Crash Course
                                        </Text>
                                        <Text className="text-[15px] text-[#280e49] font-normal mt-1">Jeff Japajam</Text>
                                        <View className="flex-row items-center gap-1 mt-1 mb-2">
                                            <Text className="text-xs text-gray-600">4/5</Text>
                                            <View className="flex-row items-center gap-1 mt-1">
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                                <AntDesign name="star" color={"#dba100"} size={15} />
                                            </View>
                                            <Text>2 reviews</Text>
                                        </View>
                                        <View className="flex-row justify-between items-center mt-3">
                                            <Text className="text-[18px] font-bold mt-3">{t?.price / 1000} sol</Text>
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