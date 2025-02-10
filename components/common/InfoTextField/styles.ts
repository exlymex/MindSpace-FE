import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            position: 'relative',
        },
        label: {
            color: theme.colors.ezBlack,
        },
        input: {
            color: theme.colors.ezDeepDark,
            paddingBottom: theme.xs,
            paddingTop: theme.xs,
            borderBottomWidth: theme.scale(1),
            borderBottomColor: theme.colors.ezGrayMedium,
        },
        inputTextFocused: {
            borderColor: theme.colors.ezPrimary,
        },
        errorText: {
            fontSize: theme.scale(12),
            color: theme.colors.ezBlack,
            paddingVertical: theme.scale(0),
        },
        errorColor: {
            color: theme.colors.ezErrorRedDark,
        },
        errorTextInput: {
            borderWidth: theme.scale(1),
            borderColor: theme.colors.ezErrorRedDark,
        },
        rightIconContainer: {
            position: 'absolute',
            top: theme.scale(15),
            right: 0,
            pointerEvents: 'none',
        },
    });
