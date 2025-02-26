import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.scale(12),
      overflow: 'hidden',
      elevation: 2,
      shadowColor: theme.colors.ezBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: theme.scale(160),
      resizeMode: 'cover',
    },
    content: {
      padding: theme.scale(16),
    },
    title: {
      marginBottom: theme.scale(8),
      color: theme.colors.ezBlack,
    },
    description: {
      color: theme.colors.ezGrayDark,
      marginBottom: theme.scale(12),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    readingTime: {
      color: theme.colors.ezGrayDark,
    },
  }); 