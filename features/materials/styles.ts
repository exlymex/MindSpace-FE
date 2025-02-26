import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      padding: theme.scale(16),
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
    },
    searchBar: {
      margin: theme.scale(16),
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    categoriesList: {
      paddingHorizontal: theme.scale(16),
      gap: theme.scale(8),
    },
    chip: {
      marginRight: theme.scale(8),
    },
    materialsList: {
      padding: theme.scale(16),
      gap: theme.scale(16),
    },
    materialCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.scale(12),
      overflow: 'hidden',
      elevation: 2,
      shadowColor: theme.colors.ezBlack,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    cardImage: {
      width: '100%',
      height: theme.scale(160),
      resizeMode: 'cover',
    },
    cardContent: {
      padding: theme.scale(16),
    },
    cardTitle: {
      marginBottom: theme.scale(8),
      color: theme.colors.ezBlack,
    },
    cardDescription: {
      color: theme.colors.ezGrayDark,
      marginBottom: theme.scale(12),
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    readingTime: {
      color: theme.colors.ezGrayDark,
    },
  }); 