import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { CustomText } from '@/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { 
  FadeInRight, 
  FadeOutLeft,
  SlideInRight 
} from 'react-native-reanimated';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success';
}

interface NotificationsBlockProps {
  notifications: Notification[];
  onNotificationPress: (id: string) => void;
}

const NotificationItem: FC<{ notification: Notification; onPress: () => void }> = ({ 
  notification, 
  onPress 
}) => {
  const { s, theme } = useStyles(styles);
  
  const getIconName = () => {
    switch (notification.type) {
      case 'warning': return 'alert-circle-outline';
      case 'success': return 'check-circle-outline';
      default: return 'information-outline';
    }
  };
  
  const getIconColor = () => {
    switch (notification.type) {
      case 'warning': return theme.colors.ezOrangeBackground;
      case 'success': return theme.colors.ezGreen;
      default: return theme.colors.ezPrimary;
    }
  };
  
  return (
    <Animated.View
      entering={SlideInRight.springify()}
      exiting={FadeOutLeft}
      style={[
        s.notificationItem,
        !notification.isRead && s.unreadNotification
      ]}
    >
      <TouchableOpacity 
        style={s.notificationContent}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={s.notificationIconContainer}>
          <View style={[s.notificationIcon, { backgroundColor: `${getIconColor()}15` }]}>
            <MaterialCommunityIcons 
              name={getIconName()} 
              size={20} 
              color={getIconColor()} 
            />
          </View>
        </View>
        
        <View style={s.notificationTextContent}>
          <View style={s.notificationHeader}>
            <CustomText variant="ezSubtitleSemi" style={s.notificationTitle} numberOfLines={1}>
              {notification.title}
            </CustomText>
            <CustomText variant="ezCaptionMedium" style={s.notificationTime}>
              {new Date(notification.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </CustomText>
          </View>
          <CustomText variant="ezSubtitleRegular" style={s.notificationMessage} numberOfLines={2}>
            {notification.message}
          </CustomText>
        </View>
        
        {!notification.isRead && (
          <View style={s.unreadDot} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export const NotificationsBlock: FC<NotificationsBlockProps> = ({ notifications, onNotificationPress }) => {
  const { s, theme } = useStyles(styles);

  if (notifications.length === 0) {
    return (
      <Animated.View 
        entering={FadeInRight.duration(800)}
        style={s.container}
      >
        <View style={s.header}>
          <CustomText variant="ezH4Semi">Сповіщення</CustomText>
        </View>
        <View style={s.emptyContainer}>
          <MaterialCommunityIcons 
            name="bell-off-outline" 
            size={40} 
            color={theme.colors.ezGrayDark} 
          />
          <CustomText variant="ezSubtitleRegular" style={s.emptyText}>
            У вас немає нових сповіщень
          </CustomText>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View 
      entering={FadeInRight.duration(800)}
      style={s.container}
    >
      <View style={s.header}>
        <CustomText variant="ezH4Semi">Сповіщення</CustomText>
        <MaterialCommunityIcons 
          name="bell-outline" 
          size={24} 
          color={theme.colors.ezPrimary} 
        />
      </View>
      <View style={s.notificationsList}>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() => onNotificationPress(notification.id)}
          />
        ))}
      </View>
    </Animated.View>
  );
}; 