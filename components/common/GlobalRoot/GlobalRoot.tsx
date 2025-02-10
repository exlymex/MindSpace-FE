import React from 'react';
import {PaperProvider} from "react-native-paper";
import {Stack} from "expo-router";
import {useThemeToggle} from "@/hooks";

const GlobalRoot = () => {
    const {theme} = useThemeToggle();

    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{headerShown: false}}/>
        </PaperProvider>
    );
};

export default GlobalRoot;