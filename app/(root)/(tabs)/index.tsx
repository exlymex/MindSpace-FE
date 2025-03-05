import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import Animated, {FadeIn, SlideInLeft, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useStyles} from '@/hooks';
import {Header, NotificationsBlock, QuickActions, UsefulMaterials} from '@/features/home/components';
import {AppTheme} from '@/theme';
import {useGetCurrentUserQuery} from '@/features/auth/api/authApi';
import { getFullAvatarUrl } from '@/utils/getFullAvatarUrl';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
    const {s} = useStyles(styles);
    const {data: userData} = useGetCurrentUserQuery();

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(1, {duration: 1000}),
        };
    });

    return (
        <SafeAreaView style={s.container}>
            <AnimatedScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={s.scrollContent}
            >
                <Animated.View
                    entering={FadeIn.duration(1000)}
                    style={[s.headerContainer, headerAnimatedStyle]}
                >
                    <Header 
                        firstName={userData?.first_name} 
                        lastName={userData?.last_name}
                        avatarUrl={getFullAvatarUrl(userData?.avatar_url)}
                    />
                </Animated.View>

                <Animated.View
                    entering={SlideInLeft.springify().damping(15)}
                    style={s.contentContainer}
                >
                    <QuickActions/>
                    <NotificationsBlock 
                        notifications={[]} 
                        onNotificationPress={(id) => console.log('Notification pressed:', id)} 
                    />
                    <UsefulMaterials/>
                </Animated.View>
            </AnimatedScrollView>
        </SafeAreaView>
    );
}

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        scrollContent: {
            flexGrow: 1,
        },
        headerContainer: {
            zIndex: 1,
        },
        contentContainer: {
            flex: 1,
            paddingHorizontal: theme.scale(16),
        },
    });
