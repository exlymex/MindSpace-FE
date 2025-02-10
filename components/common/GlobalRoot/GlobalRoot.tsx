import React from 'react';
import {PaperProvider} from "react-native-paper";
import {useThemeToggle} from "@/hooks";
import {Stack} from "expo-router";

const GlobalRoot = () => {
    const {theme} = useThemeToggle();

    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{headerShown: false}}/>
        </PaperProvider>
    );
};

export default GlobalRoot;