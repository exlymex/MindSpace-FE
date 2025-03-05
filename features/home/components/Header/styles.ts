import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            paddingVertical: theme.scale(16),
            justifyContent: 'space-between',
            flexDirection: 'row-reverse',
            alignItems: 'center',
        },
        greeting: {
            color: theme.colors.onBackground,
        },
        profileButton: {
            margin: 0,
            elevation: 2,
            shadowColor: theme.colors.ezBlack,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 1,
        },
        avatarImage: {
            width: theme.scale(28),
            height: theme.scale(28),
            borderRadius: theme.scale(14),
            borderWidth: 1,
            borderColor: theme.colors.ezPrimary,
        }
    });