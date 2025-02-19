import React, { useEffect } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming,
  FadeIn,
  SlideInLeft 
} from 'react-native-reanimated';
import { useStyles } from '@/hooks';
import { 
  Header, 
  QuickActions, 
  NotificationsBlock,
  UsefulMaterials 
} from '@/features/home/components';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function HomeScreen() {
  const { s } = useStyles(styles);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, { duration: 1000 }),
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
          <Header />
        </Animated.View>

        <Animated.View 
          entering={SlideInLeft.springify().damping(15)}
          style={s.contentContainer}
        >
          <QuickActions />
          <NotificationsBlock notifications={[]} onNotificationPress={() => {}} />
          <UsefulMaterials />
        </Animated.View>
      </AnimatedScrollView>
    </SafeAreaView>
  );
}import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

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
