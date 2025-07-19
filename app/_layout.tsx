import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import store from '../src/store/store';  // adjust path to your store
import "../global.css";
import GlobalStyle from '../src/style/GlobalStyle';

export default function RootLayout() {
    return (
        <Provider store={store}>
            <SafeAreaView style={GlobalStyle.droidSafeArea}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </SafeAreaView>
        </Provider>
    );
}
