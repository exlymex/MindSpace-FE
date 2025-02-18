import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            width: '100%',
        },
        pickerContainer: {
            borderWidth: 1,
            borderColor: theme.colors.ezGrayMedium,
            borderRadius: theme.scale(6),
            backgroundColor: theme.colors.surface,
            padding: theme.scale(10),
            minHeight: theme.scale(40),
            justifyContent: 'center',
        },
        pickerText: {
            fontSize: theme.scale(14),
            color: theme.colors.ezBlack,
        },
        modal: {
            justifyContent: 'flex-end',
            margin: 0,
        },
        modalContent: {
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: theme.scale(15),
            borderTopRightRadius: theme.scale(15),
            padding: theme.scale(20),
        },
        picker: {
            height: theme.scale(200),
        },
        pickerIos: {
            width: '100%',
            fontSize: theme.scale(14),
            fontWeight: '500',
            height: theme.scale(40),
            backgroundColor: theme.colors.surface,
            borderRadius: theme.scale(6),
            borderWidth: theme.scale(1),
            borderColor: theme.colors.ezGrayMedium,
            color: theme.colors.ezBlack,
            paddingHorizontal: theme.scale(12),
        },
        iconContainer: {
            top: theme.scale(11),
            right: theme.scale(12),
        },
        label: {
            fontSize: theme.scale(12),
            color: theme.colors.ezBlack,
            paddingVertical: theme.scale(0),
            paddingBottom: theme.scale(4),
        },

        errorPicker: {
            borderColor: theme.colors.ezErrorRedDark,
        },
        errorColor: {
            color: theme.colors.ezErrorRedDark,
        },
        pickerContainerFocused: {
            borderColor: theme.colors.ezPrimary,
        },
        placeholder: {
            color: theme.colors.ezGrayMedium,
            fontSize: theme.scale(14),
            fontWeight: '500',
        },
        errorText: {
            fontSize: theme.scale(12),
            color: theme.colors.ezBlack,
            paddingVertical: theme.scale(0),
            paddingBottom: theme.scale(4),
        },
    });
