import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
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
  }); 