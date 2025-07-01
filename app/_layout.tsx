// app/_layout.tsx
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import "../global.css";
import GlobalStyle from '../src/style/GlobalStyle';

export default function RootLayout() {
    return (
        <SafeAreaView style={GlobalStyle.droidSafeArea}>
            <Stack
                screenOptions={{
                    headerShown: false,
                    // or customize header
                    // headerStyle: { backgroundColor: '#fff' },
                }}
            />
        </SafeAreaView>
    );
}



