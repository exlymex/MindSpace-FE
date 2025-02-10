import {Platform, StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        rightElement: {
            paddingRight: theme.m,
        },
        alignLeft: {
            alignSelf: 'flex-start',
        },
        marginLeft: {
            ...Platform.select({
                ios: {
                    marginLeft: -theme.scale(35),
                },
            }),
        },
        header: {
            height: theme.scale(72),
        },
    });
