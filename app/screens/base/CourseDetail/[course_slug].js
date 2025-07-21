import { useState, useEffect, useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { List } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../../partials/BottomScreenNavigation";
import ScreenHeader from "../../partials/ScreenHeader";
import { useLocalSearchParams } from 'expo-router';
import apiInstance from "../../../../src/utils/axios";
import moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import { useVideoPlayer, VideoView } from 'expo-video';

const CourseDetail = () => {
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    const [course, setCourse] = useState([]);
    const { course_slug } = useLocalSearchParams();
    const refRBSheet = useRef();
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [selectedVariantItem, setSelectedVariantItem] = useState({ title: "", video: "", content_duration: "" });

    const fetchCourse = async () => {
        try {
            const response = await apiInstance.get(`course/course-detail/${course_slug}/`);
            setCourse(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleSelectedVariantItem = (title, video, content_duration) => {
        setSelectedVariantItem({ title, video, content_duration });
        refRBSheet.current.open();
    };

    const renderStars = (count) => {
        return [...Array(5)].map((_, i) => (
            <AntDesign key={i} name="star" size={15} color={i < count ? "#dba100" : "#ccc"} />
        ));
    };

    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <View className="bg-[#280e49] rounded-2xl mb-4 text-center">
                    <ScreenHeader title="Course Detail" returnScreen={'/screens/base/Home'} />
                </View>
                <View className="pb-3 w-full p-2 rounded-md">
                    <Image source={{ uri: course.image }} className="h-[200px] w-full rounded-md object-cover" />

                    <Text className="text-[20px] text-[#280e49] font-semibold mt-2">{course.title}</Text>

                    <View className="py-2">
                        <Text className="text-[15px] text-[#280e49] font-normal">{course.description}</Text>
                    </View>

                    <View className="flex-row items-center gap-1 mt-1">
                        <Text>{course?.average_rating || 0}/5</Text>
                        <View className="flex-row items-center ml-2">{renderStars(course?.average_rating)}</View>
                        <Text className="ml-2">{course?.rating_count} review{course?.rating_count?.length > 1 ? "s" : ""}</Text>
                    </View>

                    <Text className="text-[15px] mt-4">Created By: <Text className="font-bold">Jerry Charja</Text></Text>
                    <Text className="text-[15px] mt-1">Date Published: <Text className="font-bold">{moment(course?.date).format("DD MMM, YYYY")}</Text></Text>
                    <Text className="text-[15px] mt-1">Language: <Text className="font-bold">{course?.language}</Text></Text>

                    <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex-row mt-5 items-center justify-center p-3">
                        <Text className="text-white mr-3">Add to Cart</Text>
                        <FontAwesome5 name="shopping-cart" color={"#fff"} size={15} />
                    </TouchableOpacity>

                    <Text className="font-bold text-[20px] mt-10">Course Content</Text>
                    <List.Section>
                        {course?.variant?.map((v, index) => (
                            <List.Accordion
                                title={v?.title}
                                key={index}
                                titleStyle={{ fontWeight: 'bold' }}
                                style={{ backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 10 }}
                            >
                                {v?.variant_items?.map((i, v_index) => (
                                    <List.Item
                                        onPress={i.preview ? () => handleSelectedVariantItem(i?.title, i?.file, i?.content_duration) : null}
                                        title={i?.title}
                                        style={{ marginLeft: 20 }}
                                        left={(props) => <List.Icon {...props} icon={i.preview ? "play" : "lock"} />}
                                        key={v_index}
                                    />
                                ))}
                            </List.Accordion>
                        ))}
                    </List.Section>

                    <Text className="font-normal text-[15px] mt-7">{course.description}</Text>

                    <Text className="font-bold text-[18px] mt-10 mb-3">Course Reviews</Text>
                    {course?.reviews?.map((r, index) => (
                        <View className="bg-gray-200 p-3 rounded-md mb-3" key={index}>
                            <Text className="font-bold text-[17px]">{r?.user?.full_name || "No Name Found"}</Text>
                            <Text className="font-normal text-[14px]">{moment(r?.date).format("DD MMM, YYYY")}</Text>
                            <View className="flex-row items-center gap-1 mt-1">{renderStars(r?.rating)}</View>
                            <Text className="mt-3">{r?.review}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>

            <BottomScreenNavigation />

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                dragFromTopOnly={true}
                height={300}
                customStyles={{
                    wrapper: { backgroundColor: "#00000077" },
                    draggableIcon: { backgroundColor: "#280e49" },
                    container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16 },
                }}
            >
                <Text className="text-center font-bold text-[16px]">
                    {selectedVariantItem?.title} - {selectedVariantItem?.content_duration}
                </Text>
                {/* <View style={styles.container}>
                    {selectedVariantItem?.video ? (
                        <Video
                            ref={video}
                            style={styles.video}
                            source={{ uri: selectedVariantItem?.video }}
                            useNativeControls
                            resizeMode={ResizeMode.CONTAIN}
                            isLooping
                            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                        />
                    ) : (
                        <Text className="text-center mt-5 text-gray-500">No preview available.</Text>
                    )}
                </View> */}
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        alignSelf: "center",
        width: 320,
        height: 200,
        borderRadius: 8,
    },
});

export default CourseDetail;
