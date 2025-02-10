import {StyleSheet} from 'react-native';

import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
    StyleSheet.create({
        loader: {
            width: theme.scale(83),
            height: theme.scale(83),
        },
        loaderContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.scale(-41.5),
        },
        messageContainer: {
            marginTop: theme.l,
        },
    });
