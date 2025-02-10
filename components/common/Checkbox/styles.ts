import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
        checkbox: {
            width: theme.scale(20),
            height: theme.scale(20),
            borderRadius: theme.scale(3),
            borderWidth: theme.scale(2),
            borderColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.xs,
        },
        checked: {
            backgroundColor: theme.colors.primary,
        },
        label: {
            fontSize: theme.scale(14),
        },
    });
