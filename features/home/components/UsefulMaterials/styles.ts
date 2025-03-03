import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.scale(24),
      marginBottom: theme.scale(16),
    },
    sectionTitle: {
      marginBottom: theme.scale(16),
      color: theme.colors.onBackground,
    },
    materialsContainer: {
      gap: theme.scale(16),
    },
    materialCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.scale(12),
      overflow: 'hidden',
      elevation: 2,
      shadowColor: theme.colors.ezBlack,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    materialImage: {
      width: '100%',
      height: theme.scale(140),
      resizeMode: 'cover',
    },
    materialContent: {
      padding: theme.scale(12),
    },
    materialHeader: {
      marginBottom: theme.scale(4),
    },
    materialTitle: {
      color: theme.colors.onBackground,
    },
    materialDescription: {
      color: theme.colors.ezGrayDark,
      marginBottom: theme.scale(8),
    },
    materialFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.scale(8),
    },
    materialType: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    materialTypeText: {
      color: theme.colors.ezPrimary,
      marginLeft: theme.scale(4),
    },
  }); 