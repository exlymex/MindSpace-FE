import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.scale(16),
      overflow: 'hidden',
      elevation: 3,
      shadowColor: theme.colors.ezBlack,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.ezGrayBackground,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.scale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
      backgroundColor: theme.colors.ezLight,
    },
    psychologistInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: theme.scale(48),
      height: theme.scale(48),
      borderRadius: theme.scale(24),
      marginRight: theme.scale(12),
      borderWidth: 2,
      borderColor: theme.colors.ezPrimary,
    },
    psychologistName: {
      color: theme.colors.ezBlack,
      marginBottom: theme.scale(4),
    },
    statusBadge: {
      borderRadius: theme.scale(12),
      paddingHorizontal: theme.scale(8),
      paddingVertical: theme.scale(4),

      // height: theme.scale(24),
    },
    content: {
      padding: theme.scale(16),
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: theme.scale(16),
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.ezLight,
      paddingHorizontal: theme.scale(12),
      paddingVertical: theme.scale(8),
      borderRadius: theme.scale(12),
      flex: 0.48,
    },
    infoIcon: {
      margin: 0,
      marginRight: theme.scale(4),
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: theme.scale(12),
      paddingHorizontal: theme.scale(16),
      borderTopWidth: 1,
      borderTopColor: theme.colors.ezGrayBackground,
      backgroundColor: theme.colors.ezLight,
    },
    priceLabel: {
      color: theme.colors.ezGrayDark,
    },
    price: {
      color: theme.colors.ezPrimary,
      fontSize: theme.scale(18),
    },
    actions: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: theme.colors.ezGrayBackground,
    },
    actionButton: {
      flex: 1,
      paddingVertical: theme.scale(12),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    actionButtonText: {
      color: theme.colors.ezPrimary,
      marginLeft: theme.scale(8),
    },
    cancelButton: {
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.ezGrayBackground,
    },
    cancelButtonText: {
      color: theme.colors.ezRed,
      marginLeft: theme.scale(8),
    },
  }); 