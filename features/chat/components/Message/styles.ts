import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    messageContainer: {
      maxWidth: '80%',
      marginVertical: theme.scale(4),
      padding: theme.scale(12),
      borderRadius: theme.scale(12),
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: theme.colors.ezPrimary,
    },
    psychologistMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.ezGrayBackground,
    },
    messageText: {
      fontSize: theme.scale(14),
      lineHeight: theme.scale(20),
    },
    userMessageText: {
      color: theme.colors.surface,
    },
    psychologistMessageText: {
      color: theme.colors.ezText,
    },
    timestamp: {
      fontSize: theme.scale(10),
      color: theme.colors.ezGrayDark,
      marginTop: theme.scale(4),
      alignSelf: 'flex-end',
    },
  }); 