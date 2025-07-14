import { useRouter } from "expo-router";
import { Text, View } from "react-native";


const StudentScreenHeader = ({ title, returnScreen }) => {
    const router = useRouter();
    return (
        <View className="bg-[#280e49] p-2 rounded-[8px] mb-3">
            <View className="flex-row items-center justify-center bg-[#280e4935] gap-5">
                {/* <TouchableOpacity onPress={() => router.push(returnScreen)} className="h-[30px] w-[30px] bg-white rounded-full flex items-center justify-center">
                    <FontAwesome5 name="arrow-left" color={"#280e49"} size={15} />
                </TouchableOpacity> */}
                <View>
                    <Text className="text-white text-[17px] font-semibold text-center">{title}</Text>
                </View>


            </View>
        </View>
    )
}


export default StudentScreenHeader;