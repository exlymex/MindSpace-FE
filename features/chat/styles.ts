import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: theme.colors.surface,
    },
    messageList: {
    //   flex: 1,
    },
    messageListContent: {
      padding: theme.scale(16),
    },
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
    inputContainer: {
      flexDirection: 'row',
      padding: theme.scale(16),
      backgroundColor: theme.colors.surface,
      borderTopWidth: theme.scale(1),
      borderTopColor: theme.colors.ezGrayBackground,
    },
    input: {
      flex: 1,
      backgroundColor: theme.colors.ezGrayBackground,
      borderRadius: theme.scale(20),
      paddingHorizontal: theme.scale(16),
      paddingVertical: theme.scale(8),
      marginRight: theme.scale(8),
      color: theme.colors.ezText,
      maxHeight: theme.scale(100),
      fontSize: theme.scale(14),
    },
    sendButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: theme.scale(40),
      height: theme.scale(40),
      borderRadius: theme.scale(20),
    },
    sendButtonDisabled: {
      opacity: 0.5,
    },
    connectionStatus: {
      padding: theme.scale(8),
      alignItems: 'center',
      backgroundColor: theme.colors.ezErrorRedLight,
    },
    connectionStatusText: {
      color: theme.colors.ezErrorRedDark,
      fontSize: theme.scale(12),
    },
    typingIndicator: {
      padding: theme.scale(8),
      paddingHorizontal: theme.scale(16),
      fontStyle: 'italic',
      color: theme.colors.ezGrayDark,
      fontSize: theme.scale(12),
    },
  }); 