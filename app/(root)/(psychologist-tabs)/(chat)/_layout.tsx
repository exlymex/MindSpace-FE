import React from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useTheme} from 'react-native-paper';
import {AppTheme} from '@/theme/theme';

export default function ChatLayout() {
    const theme = useTheme<AppTheme>();

    return (
        <>
            <StatusBar style={theme.dark ? 'light' : 'dark'}/>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    animation: 'slide_from_right',
                }}
            />
        </>
    );
} 