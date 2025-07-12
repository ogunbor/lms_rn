import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { List } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import ScreenHeader from "../partials/ScreenHeader";

const CourseDetail = () => {
    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <ScreenHeader title={"Course Detail"} returnScreen={'/screens/base/Home'} />
                {/* section 2 */}
                <View className="pb-3 w-full p-2 rounded-md">
                    <Image source={require('../../../assets/images/handshake.jpg')} className="h-[200px] w-full rounded-md object-cover" />
                    <View>
                        <Text className="text-[20px] text-[#280e49] font-semibold mt-2">
                            Python Crash Course
                        </Text>
                        <Text className="text-[15px] text-[#280e49] font-normal mt-1 mt-3">
                            lorem ipsum
                        </Text>
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
                        <Text className="text-[15px] mt-4">
                            Created By:
                            <Text className="font-bold"> Jerry Charja</Text>
                        </Text>
                        <Text className="text-[15px] mt-1">
                            Last Updated:
                            <Text className="font-bold"> 07/14/2000</Text>
                        </Text>
                        <Text className="text-[15px] mt-1 mb-4">
                            Language:
                            <Text className="font-bold"> English</Text>
                        </Text>
                        <TouchableOpacity className="bg-[#280e49] rounded-md w-30 flex-row items-center justify-center p-2">
                            <Text className="text-white mr-3">Add to Cart</Text>
                            <FontAwesome5 name="shopping-cart" color={"#ffff"} size={15} />
                        </TouchableOpacity>

                        <Text className="font-bold text-[20px] mt-10">
                            Course Content
                        </Text>

                        <List.Section title="">
                            <List.Accordion title="Section 1" className="bg-gray-300 rounded-md mb-4">
                                <List.Item title="Introduction to python" className="ml-10" left={(props) => <List.Icon {...props} icon="play" />} />
                                <List.Item title="Functions in python" className="ml-10" left={(props) => <List.Icon {...props} icon="lock" />} />
                            </List.Accordion>

                            <List.Accordion title="Section 1" className="bg-gray-300 rounded-md mb-4">
                                <List.Item title="Introduction to python" className="ml-10" left={(props) => <List.Icon {...props} icon="play" />} />
                                <List.Item title="Functions in python" className="ml-10" left={(props) => <List.Icon {...props} icon="lock" />} />
                            </List.Accordion>

                            <List.Accordion title="Section 1" className="bg-gray-300 rounded-md mb-4">
                                <List.Item title="Introduction to python" className="ml-10" left={(props) => <List.Icon {...props} icon="play" />} />
                                <List.Item title="Functions in python" className="ml-10" left={(props) => <List.Icon {...props} icon="lock" />} />
                            </List.Accordion>
                        </List.Section>
                        <View>
                            <Text className="font-bold text-[20px] mt-10">
                                Course Description
                            </Text>
                            <Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>
                        </View>

                        <View>
                            <Text className="font-bold text-[20px] mt-10">
                                Course Reviews
                            </Text>
                            <View className="bg-gray-200 p-3 rounded-md mb-3">
                                <View>
                                    <Text className="font-bold text-[17px]">
                                        Samuel Jaay
                                    </Text>
                                    <Text className="font-bold text-[14px]">
                                        07/14/2007
                                    </Text>
                                    <View className="flex-row items-center gap-1 mt-1">
                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                        <AntDesign name="star" color={"#dba100"} size={15} />
                                    </View>
                                    <Text className="mt-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* Bottom Navigation */}
            <BottomScreenNavigation />
        </View>
    );
}

export default CourseDetail