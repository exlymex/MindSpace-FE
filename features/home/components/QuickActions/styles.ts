import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.l,
    },
    title: {
      marginBottom: theme.l,
    },
    buttonsContainer: {
      gap: theme.s,
    },
    button: {
      width: '100%',
    },
  }); 