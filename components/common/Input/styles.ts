import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        inputContainer: {
            width: '100%',
        },
        input: {
            borderWidth: theme.scale(1),
            width: '100%',
            borderRadius: theme.scale(6),
            height: theme.scale(36),
            paddingHorizontal: theme.scale(12),
            borderColor: theme.colors.ezGrayMedium,
            fontSize: theme.scale(14),
            fontWeight: '400',
            backgroundColor: theme.colors.surface,
        },
        inputTextFocused: {
            borderColor: theme.colors.ezPrimary,
        },
        readOnly: {
            backgroundColor: theme.colors.ezGrayBackground,
        },
        label: {
            fontSize: theme.scale(12),
            color: theme.colors.ezBlack,
            paddingVertical: theme.scale(0),
            paddingBottom: theme.scale(4),
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
            bottom: theme.scale(28),
            right: theme.s,
            pointerEvents: 'none',
        },
    });
