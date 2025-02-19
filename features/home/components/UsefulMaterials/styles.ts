import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.scale(16),
      padding: theme.scale(16),
    },
    title: {
      fontSize: theme.scale(18),
      fontWeight: '600',
      color: theme.colors.ezBlack,
      marginBottom: theme.scale(12),
    },
    materialsContainer: {
      gap: theme.scale(12),
    },
    materialCard: {
      flexDirection: 'row',
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
    materialImage: {
      width: theme.scale(80),
      height: theme.scale(80),
    },
    materialContent: {
      flex: 1,
      padding: theme.scale(12),
    },
    materialTitle: {
      fontSize: theme.scale(16),
      fontWeight: '500',
      color: theme.colors.ezBlack,
      marginBottom: theme.scale(4),
    },
    materialDescription: {
      fontSize: theme.scale(14),
      color: theme.colors.ezGrayDark,
    },
  }); 