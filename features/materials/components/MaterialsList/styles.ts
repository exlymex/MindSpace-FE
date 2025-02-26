import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    searchBar: {
      margin: theme.scale(16),
      backgroundColor: theme.colors.surface,
      elevation: 2,
      borderRadius: theme.scale(12),
    },
    categoriesContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: theme.scale(8),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
    },
    categoriesList: {
      paddingHorizontal: theme.scale(16),
    },
    categoryButton: {
      height: theme.scale(36),
      paddingHorizontal: theme.scale(16),
      marginRight: theme.scale(8),
      borderRadius: theme.scale(18),
      backgroundColor: theme.colors.ezGrayBackground,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
    },
    selectedCategoryButton: {
      backgroundColor: theme.colors.ezPrimary,
    },
    categoryText: {
      color: theme.colors.ezGrayDark,
      fontSize: theme.scale(14),
    },
    selectedCategoryText: {
      color: theme.colors.surface,
    },
    materialsList: {
      padding: theme.scale(16),
      gap: theme.scale(16),
    },
    emptyText: {
      textAlign: 'center',
      marginTop: theme.scale(32),
      color: theme.colors.ezGrayDark,
    },
  }); 