import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    messageContainer: {
      maxWidth: '75%',
      marginVertical: theme.scale(4),
      marginHorizontal: theme.scale(16),
      padding: theme.scale(12),
      borderRadius: theme.scale(16),
      elevation: 2,
      shadowColor: theme.colors.ezBlack,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    userMessage: {
      alignSelf: 'flex-end',
      marginRight: theme.scale(24),
      backgroundColor: theme.colors.ezPrimary,
      borderBottomRightRadius: theme.scale(4),
    },
    otherUserMessage: {
      alignSelf: 'flex-start',
      backgroundColor: theme.colors.surface,
      borderBottomLeftRadius: theme.scale(4),
    },
    messageText: {
      fontSize: theme.scale(14),
      lineHeight: theme.scale(20),
    },
    userMessageText: {
      color: theme.colors.surface,
    },
    otherUserMessageText: {
      color: theme.colors.ezBlack,
    },
    timestamp: {
      fontSize: theme.scale(10),
      marginTop: theme.scale(4),
      alignSelf: 'flex-end',
      opacity: 0.7,
    },
    userTimestamp: {
      color: theme.colors.surface,
    },
    otherUserTimestamp: {
      color: theme.colors.ezGrayDark,
    },
  }); 