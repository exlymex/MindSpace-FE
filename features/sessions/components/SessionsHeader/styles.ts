import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.scale(16),
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      color: theme.colors.ezBlack,
      marginBottom: theme.scale(4),
    },
    subtitle: {
      color: theme.colors.ezGrayDark,
    },
    actionsContainer: {
      flexDirection: 'row',
    },
    actionButton: {
      margin: 0,
      marginLeft: theme.scale(8),
    },
  }); 