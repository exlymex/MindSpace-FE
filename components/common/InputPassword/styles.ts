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
            paddingLeft: theme.scale(12),
            paddingRight: theme.scale(29),
            borderColor: theme.colors.ezGrayMedium,
            fontSize: theme.scale(14),
            fontWeight: '500',
            backgroundColor: theme.colors.surface,
        },
        inputTextFocused: {
            borderColor: theme.colors.ezPrimary,
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
        inputWrap: {
            position: 'relative',
        },
        imageLock: {
            position: 'absolute',
            top: theme.scale(12),
            left: theme.scale(8),
            zIndex: 1,
            color: theme.colors.ezGrayDark,
        },
        showPasswordIcon: {
            position: 'absolute',
            top: theme.scale(10),
            right: theme.scale(8),
            zIndex: 1,
            color: theme.colors.ezGrayDark,
        },
        showPasswordIconActive: {
            color: theme.colors.ezPrimary,
        },
    });
