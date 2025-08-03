import { useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    StatusBar,
    RefreshControl,
    LinearGradient
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import { logout } from "../../../src/utils/auth"
import { useDispatch } from "react-redux";
import apiInstance from "../../../src/utils/axios";
import useUserData from "../../../src/plugin/useUserData"
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

const Home = () => {
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [cartId, setCartId] = useState("");
    const [addingToCart, setAddingToCart] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [cartCount, setCartCount] = useState(0);

    // Animation refs
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    const router = useRouter();
    const dispatch = useDispatch();
    const user_id = useUserData();

    useEffect(() => {
        fetchCourses();
        // Start entrance animations
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const logoutUser = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: () => {
                        logout(dispatch);
                        router.push("/screens/auth/Login");
                    }
                }
            ]
        );
    };

    const fetchCourses = async () => {
        const cart_id = await AsyncStorage.getItem("randomString");
        setCartId(cart_id);

        setLoading(true);
        try {
            const response = await apiInstance.get(`course/course-list/`);
            setTrendingCourses(response.data);
            // Simulate cart count fetch
            setCartCount(3); // Replace with actual cart count API call
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to load courses. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchCourses();
        setRefreshing(false);
    };

    const addToCart = async (courseId, userId, price, country, cartId, courseTitle) => {
        setAddingToCart(courseId);
        try {
            const payload = {
                course_id: courseId,
                user: userId,
                price,
                country,
                cart_id: cartId,
            };
            await apiInstance.post(`cart/create/`, payload);
            setCartCount(prev => prev + 1);

            Alert.alert(
                "Added to Cart! 🎉",
                `"${courseTitle}" has been added to your cart`,
                [
                    { text: "Continue Shopping", style: "cancel" },
                    { text: "View Cart", onPress: () => router.push('/screens/base/Cart') }
                ]
            );
        } catch (error) {
            console.log("Error adding to cart:", error);
            Alert.alert(
                "Oops! 😅",
                "Something went wrong while adding the course to your cart. Please try again.",
                [{ text: "OK", style: "default" }]
            );
        } finally {
            setAddingToCart(null);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<AntDesign key={i} name="star" color="#fbbf24" size={14} />);
        }
        if (hasHalfStar) {
            stars.push(<AntDesign key="half" name="star" color="#d1d5db" size={14} />);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<AntDesign key={i} name="staro" color="#d1d5db" size={14} />);
        }
        return stars;
    };

    const CourseCard = ({ course, index, isPopular = false }) => (
        <Animated.View
            style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                width: width * 0.75,
                elevation: 8,
            }}
            className="bg-white rounded-2xl shadow-lg mr-4 overflow-hidden"
        >
            {/* Course Image */}
            <View className="relative">
                <Image
                    source={isPopular ? require('../../../assets/images/rustlang.jpg') : { uri: course.image }}
                    className="h-48 w-full"
                    style={{ resizeMode: 'cover' }}
                />
                {/* Gradient Overlay */}
                <View className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Badge */}
                <View className="absolute top-3 left-3 bg-[#280e49] px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-semibold">
                        {isPopular ? "Popular" : "Trending"}
                    </Text>
                </View>

                {/* Price Badge */}
                <View className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex-row items-center">
                    <Image
                        source={require('../../../assets/images/solana.png')}
                        style={{ width: 16, height: 16, marginRight: 4 }}
                    />
                    <Text className="text-[#280e49] font-bold">
                        {((course?.price || 5000) / 1000).toFixed(3)}
                    </Text>
                </View>
            </View>

            {/* Course Content */}
            <View className="p-4">
                <Text className="text-lg font-bold text-gray-800 mb-2" numberOfLines={2}>
                    {isPopular ? "Rust Crash Course" : course.title}
                </Text>

                <View className="flex-row items-center mb-3">
                    <View className="w-8 h-8 bg-[#280e49] rounded-full mr-2 items-center justify-center">
                        <Text className="text-white text-xs font-bold">JC</Text>
                    </View>
                    <Text className="text-gray-600 text-sm">
                        {isPopular ? "Jeff Japajam" : "Jerry Charja"}
                    </Text>
                </View>

                {/* Rating */}
                <View className="flex-row items-center mb-4">
                    <View className="flex-row items-center mr-2">
                        {renderStars(isPopular ? 4 : (course.average_rating || 0))}
                    </View>
                    <Text className="text-sm text-gray-600 mr-1">
                        {isPopular ? "4.0" : (course.average_rating || 0).toFixed(1)}
                    </Text>
                    <Text className="text-sm text-gray-500">
                        ({isPopular ? "2 reviews" :
                            course?.rating_count === 0 ? 'No reviews' :
                                `${course?.rating_count} ${course?.rating_count === 1 ? 'review' : 'reviews'}`})
                    </Text>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={() => router.push(isPopular ? '/screens/base/CourseDetail' : `/screens/base/CourseDetail/${course?.slug}`)}
                        className="flex-1 bg-gray-100 py-3 rounded-xl items-center"
                    >
                        <Text className="text-[#280e49] font-semibold">View Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            if (isPopular) {
                                router.push('/screens/base/Cart');
                            } else {
                                addToCart(course?.id, user_id, course?.price, "Nigeria", cartId, course?.title);
                            }
                        }}
                        disabled={addingToCart === course?.id}
                        className="bg-[#280e49] px-4 py-3 rounded-xl items-center justify-center min-w-[50px]"
                    >
                        {addingToCart === course?.id ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <FontAwesome5 name="shopping-cart" color="#fff" size={16} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );

    const CategoryCard = ({ icon, title, color, onPress }) => (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white rounded-2xl p-4 items-center mr-4 shadow-sm"
            style={{ width: 100, elevation: 2 }}
        >
            <View className={`w-12 h-12 rounded-full items-center justify-center mb-2`} style={{ backgroundColor: color + '20' }}>
                <FontAwesome5 name={icon} size={20} color={color} />
            </View>
            <Text className="text-sm font-semibold text-gray-700 text-center">{title}</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#280e49" />
            <View className="bg-gray-50 flex-1">
                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#280e49']}
                            tintColor="#280e49"
                        />
                    }
                >
                    {/* Enhanced Header */}
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="bg-[#280e49] px-4 pt-12 pb-6 rounded-b-[30px] shadow-lg"
                    >
                        <View className="flex-row items-center justify-between mb-6">
                            <View className="flex-row items-center">
                                <View className="relative">
                                    <Image
                                        source={require('../../../assets/images/handshake.jpg')}
                                        className="h-12 w-12 rounded-full border-2 border-white/20"
                                    />
                                    <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                                </View>
                                <View className="ml-3">
                                    <Text className="text-white/80 text-sm">Good morning 👋</Text>
                                    <Text className="text-white text-lg font-bold">Jerry Charja</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-3">
                                {/* Cart with Badge */}
                                <TouchableOpacity
                                    onPress={() => router.push('/screens/base/Cart')}
                                    className="relative w-10 h-10 bg-white/10 rounded-full items-center justify-center"
                                >
                                    <FontAwesome5 name="shopping-cart" color="white" size={18} />
                                    {cartCount > 0 && (
                                        <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                                            <Text className="text-white text-xs font-bold">{cartCount}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>

                                {/* Notifications */}
                                <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
                                    <FontAwesome5 name="bell" color="white" size={18} />
                                    <View className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full" />
                                </TouchableOpacity>

                                {/* Logout */}
                                <TouchableOpacity
                                    onPress={logoutUser}
                                    className="w-10 h-10 bg-red-500/20 rounded-full items-center justify-center"
                                >
                                    <FontAwesome5 name="power-off" color="#ef4444" size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Enhanced Search Bar */}
                        <View className="bg-white/10 backdrop-blur-sm flex-row items-center rounded-2xl px-4 py-3">
                            <FontAwesome5 name="search" size={16} color="white" style={{ opacity: 0.7 }} />
                            <TextInput
                                placeholder="Search for courses, instructors..."
                                placeholderTextColor="rgba(255,255,255,0.7)"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                className="flex-1 text-white ml-3"
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchQuery("")}>
                                    <FontAwesome5 name="times" size={14} color="white" style={{ opacity: 0.7 }} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </Animated.View>

                    <View className="px-4">
                        {/* Categories Section */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }}
                            className="mt-6 mb-6"
                        >
                            <Text className="text-xl font-bold text-gray-800 mb-4">Browse by Category</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                <CategoryCard icon="code" title="Programming" color="#3b82f6" onPress={() => { }} />
                                <CategoryCard icon="paint-brush" title="Design" color="#8b5cf6" onPress={() => { }} />
                                <CategoryCard icon="chart-line" title="Business" color="#10b981" onPress={() => { }} />
                                <CategoryCard icon="camera" title="Photography" color="#f59e0b" onPress={() => { }} />
                                <CategoryCard icon="music" title="Music" color="#ef4444" onPress={() => { }} />
                            </ScrollView>
                        </Animated.View>

                        {/* Trending Courses Section */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }}
                            className="mb-6"
                        >
                            <View className="flex-row items-center justify-between mb-4">
                                <View>
                                    <Text className="text-xl font-bold text-gray-800">Trending Courses</Text>
                                    <Text className="text-gray-600 text-sm">Most popular this week</Text>
                                </View>
                                <TouchableOpacity className="flex-row items-center">
                                    <Text className="text-[#280e49] font-semibold mr-1">See All</Text>
                                    <FontAwesome5 name="arrow-right" color="#280e49" size={12} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {loading ? (
                                    <View className="flex-1 items-center justify-center py-20">
                                        <ActivityIndicator size="large" color="#280e49" />
                                        <Text className="text-gray-500 mt-2">Loading courses...</Text>
                                    </View>
                                ) : (
                                    <>
                                        {trendingCourses?.map((course, index) => (
                                            <CourseCard key={course.id || index} course={course} index={index} />
                                        ))}
                                    </>
                                )}
                            </ScrollView>
                        </Animated.View>

                        {/* Popular Courses Section */}
                        <Animated.View
                            style={{
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }],
                            }}
                            className="mb-20"
                        >
                            <View className="flex-row items-center justify-between mb-4">
                                <View>
                                    <Text className="text-xl font-bold text-gray-800">Popular Courses</Text>
                                    <Text className="text-gray-600 text-sm">Highly rated by students</Text>
                                </View>
                                <TouchableOpacity className="flex-row items-center">
                                    <Text className="text-[#280e49] font-semibold mr-1">See All</Text>
                                    <FontAwesome5 name="arrow-right" color="#280e49" size={12} />
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {trendingCourses?.map((course, index) => (
                                    <CourseCard key={`popular-${index}`} course={course} index={index} isPopular={true} />
                                ))}
                            </ScrollView>
                        </Animated.View>
                    </View>
                </ScrollView>

                {/* Bottom Navigation */}
                <BottomScreenNavigation />
            </View>
        </>
    );
};

export default Home;