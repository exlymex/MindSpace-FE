import {StyleSheet} from 'react-native';
import {AppTheme} from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    messageList: {
    //   flex: 1,
    },
    messageListContent: {
      padding: theme.scale(16),
    },
    connectionStatus: {
      padding: theme.scale(8),
      alignItems: 'center',
    //   backgroundColor: theme.colors.ezErrorRedLight,
    },
    typingIndicator: {
      padding: theme.scale(8),
      paddingHorizontal: theme.scale(16),
      fontStyle: 'italic',
      color: theme.colors.ezGrayDark,
      fontSize: theme.scale(12),
    },
  }); 