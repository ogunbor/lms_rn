import { useEvent } from 'expo';
import { useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRef } from 'react';
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { List, ProgressBar } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import BottomScreenNavigation from "../partials/BottomScreenNavigation";
import StudentScreenHeader from "../partials/StudentScreenHeader";


const StudentCourseDetail = () => {
    const { user_id, enrollment_id } = useLocalSearchParams();
    console.log(user_id);
    console.log(enrollment_id);

    const refRBSheet = useRef();

    const openRBSheet = () => {
        refRBSheet.current.open();
    }

    const closeRBSheet = () => {
        refRBSheet.current.close();
    }

    const videoSource =
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    return (

        <View className="bg-white flex-1 px-3">
            <ScrollView vertical showsVerticalScrollIndicator={false} className="flex-1">
                <StudentScreenHeader title={"Course Detail"} returnScreen={'/screens/base/Home'} />

                <ScrollView showsVerticalScrollIndicator={false} className="mt-5">
                    <Text className="text-[25px] font-semibold text-center">Rust Programming Course</Text>

                    <View className="flex-row justify-center items-center gap-3 mt-4">
                        <TouchableOpacity className="bg-[#280e49] p-2 w-100  flex  rounded-md ">
                            <Text className="text-white">Messages</Text>

                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#280e49] p-2  w-100  flex  rounded-md ">
                            <Text className="text-white">Notes</Text>

                        </TouchableOpacity>
                        <TouchableOpacity className="bg-[#280e49] p-2  w-100  flex  rounded-md ">
                            <Text className="text-white">Reviews</Text>

                        </TouchableOpacity>
                    </View>
                    <Text className="font-bold text-[20px] mt-10 text-center">Course Content</Text>
                    <View className="mt-3 mb-3">
                        <ProgressBar progress={0.4} color={"blue"} />
                    </View>

                    <List.Section title="">
                        <List.Accordion className="pt-[10px] bg-gray-100" title="Section 1">
                            <List.Item
                                onPress={openRBSheet}
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="play" />}
                            />
                            <List.Item
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="lock" />}
                            />
                            <List.Item
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="play" />}
                            />
                        </List.Accordion>
                        <List.Accordion className="pt-[10px] bg-gray-100" title="Section 1">
                            <List.Item
                                onPress={openRBSheet}
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="play" />}
                            />
                            <List.Item
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="lock" />}
                            />
                            <List.Item
                                className="ml-10"
                                title="Introduction to Rust"
                                left={(props) => <List.Icon {...props} icon="play" />}
                            />
                        </List.Accordion>
                    </List.Section>
                </ScrollView>
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomScreenNavigation />

            <View>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={true}
                    height={400}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "#00000077",
                        },
                        draggableIcon: {
                            backgroundColor: "#020e40",
                            width: 80,
                            height: 6,
                            borderRadius: 3,
                            alignSelf: "center",
                            marginTop: 10,
                        },
                        container: {
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        },
                    }}
                >

                    <Text className="text-center font-semibold text-[17px] mt-3" >Programming Courses - 3m 2s</Text>
                    <View style={styles.contentContainer}>
                        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                        <View style={styles.controlsContainer}>
                            <Button
                                title={isPlaying ? 'Pause' : 'Play'}
                                onPress={() => {
                                    if (isPlaying) {
                                        player.pause();
                                    } else {
                                        player.play();
                                    }
                                }}
                            />
                        </View>
                    </View>
                </RBSheet>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: 350,
        height: 275,
    },
    controlsContainer: {
        padding: 10,
    },
});

export default StudentCourseDetail