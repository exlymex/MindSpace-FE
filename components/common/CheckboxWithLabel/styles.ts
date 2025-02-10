import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            gap: theme.xs,
            paddingBottom: theme.xs,
            borderBottomWidth: theme.scale(1),
            borderColor: theme.colors.ezGrayMedium,
            marginBottom: theme.m,
        },
        flex: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: theme.xs,
        },

        checkbox: {
            width: theme.scale(20),
            height: theme.scale(20),
            borderRadius: theme.scale(3),
            borderWidth: theme.scale(2),
            borderColor: theme.colors.ezGrayMedium,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.xs,
        },
        checked: {
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.ezPrimary,
        },
    });
