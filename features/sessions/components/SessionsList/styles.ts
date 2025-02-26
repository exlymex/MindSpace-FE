import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    tabsContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.scale(16),
      paddingVertical: theme.scale(8),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
    },
    tab: {
      flex: 1,
      paddingVertical: theme.scale(8),
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: theme.colors.ezPrimary,
    },
    tabText: {
      color: theme.colors.ezGrayDark,
    },
    activeTabText: {
      color: theme.colors.ezPrimary,
    },
    sessionsList: {
      padding: theme.scale(16),
      gap: theme.scale(16),
    },
    cardWrapper: {
      marginBottom: theme.scale(16),
    },
    emptyText: {
      textAlign: 'center',
      marginTop: theme.scale(32),
      color: theme.colors.ezGrayDark,
    },
    bookButton: {
      margin: theme.scale(16),
      paddingVertical: theme.scale(8),
      backgroundColor: theme.colors.ezPrimary,
    },
  }); 