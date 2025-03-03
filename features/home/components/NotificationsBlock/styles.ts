import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme';

export const styles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: theme.scale(24),
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.scale(16),
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.ezGrayBackground,
    },
    notificationsList: {
      padding: theme.scale(8),
    },
    notificationItem: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.scale(8),
      marginVertical: theme.scale(4),
      position: 'relative',
    },
    unreadNotification: {
      backgroundColor: `${theme.colors.ezPrimary}05`,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.ezPrimary,
    },
    notificationContent: {
      flex: 1,
      flexDirection: 'row',
      padding: theme.scale(12),
    },
    notificationIconContainer: {
      marginRight: theme.scale(12),
    },
    notificationIcon: {
      width: theme.scale(36),
      height: theme.scale(36),
      borderRadius: theme.scale(18),
      justifyContent: 'center',
      alignItems: 'center',
    },
    notificationTextContent: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.scale(4),
    },
    notificationTitle: {
      color: theme.colors.onBackground,
      flex: 1,
    },
    notificationTime: {
      color: theme.colors.ezGrayDark,
      marginLeft: theme.scale(8),
    },
    notificationMessage: {
      color: theme.colors.ezGrayDark,
    },
    unreadDot: {
      position: 'absolute',
      top: theme.scale(12),
      right: theme.scale(12),
      width: theme.scale(8),
      height: theme.scale(8),
      borderRadius: theme.scale(4),
      backgroundColor: theme.colors.ezPrimary,
    },
    emptyContainer: {
      padding: theme.scale(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: theme.colors.ezGrayDark,
      marginTop: theme.scale(12),
      textAlign: 'center',
    },
  }); 