import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            gap: theme.xxs,
            padding: theme.s,
            backgroundColor: theme.colors.ezGrayBackground,
            borderColor: theme.colors.ezGrayMedium,
            borderWidth: theme.scale(1),
            borderRadius: theme.scale(6),
            marginBottom: theme.m,
        },
        label: {
            color: theme.colors.ezGrayDark,
        },
        value: {
            color: theme.colors.ezDeepDark,
        },
    });
