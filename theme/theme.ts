import {configureFonts, MD3DarkTheme, MD3LightTheme, useTheme} from 'react-native-paper';
import {moderateScale, moderateVerticalScale, scale} from 'react-native-size-matters';

import {ezColors, fontConfig, spacing} from '@/styles';
import * as Device from 'expo-device';


const isTablet = Device.deviceType === Device.DeviceType.TABLET;

export const baseTheme = {
    roundness: 2,
    // Functions from react-native-size-matters
    scale: (number: number) => (isTablet ? moderateScale(number, 0.2) : scale(number)),
    vScale: moderateVerticalScale,
    // Scaled spacing sizes
    none: spacing.NONE,
    xxxs: isTablet ? moderateScale(spacing.XXXS) : scale(spacing.XXXS),
    xxs: isTablet ? moderateScale(spacing.XXS) : scale(spacing.XXS),
    xs: isTablet ? moderateScale(spacing.XS) : scale(spacing.XS),
    s: isTablet ? moderateScale(spacing.S) : scale(spacing.S),
    m: isTablet ? moderateScale(spacing.M) : scale(spacing.M),
    l: isTablet ? moderateScale(spacing.L) : scale(spacing.L),
    xl: isTablet ? moderateScale(spacing.XL) : scale(spacing.XL),
    xxl: isTablet ? moderateScale(spacing.XXL) : scale(spacing.XXL),
    xxxl: isTablet ? moderateScale(spacing.XXXL) : scale(spacing.XXXL),
};

export const lightTheme = {
    ...MD3LightTheme,
    ...baseTheme,
    colors: {
        ...MD3LightTheme.colors,
        // Custom project colors
        ...ezColors,
        primary: ezColors.ezPrimary,
        primaryContainer: ezColors.ezPrimaryLight,
        secondaryContainer: ezColors.ezPrimaryLight,
        background: ezColors.ezGrayBackground,
        surface: ezColors.ezWhite,
        error: ezColors.ezErrorRedDark,
    },
    fonts: configureFonts({config: fontConfig}),
};

export const darkTheme = {
    ...MD3DarkTheme,
    ...baseTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...ezColors,
        primary: ezColors.ezPrimary,
        onPrimary: ezColors.ezWhite,
        error: ezColors.ezErrorRedDark,
    },
    fonts: configureFonts({config: fontConfig}),
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

export const useAppTheme = () => useTheme<AppTheme>();
