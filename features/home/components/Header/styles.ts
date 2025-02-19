import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: theme.scale(16),
      paddingVertical: theme.scale(8),
      alignItems: 'center',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'space-between',
    },
    logoutButton: {
      margin: 0,
    },
  }); 