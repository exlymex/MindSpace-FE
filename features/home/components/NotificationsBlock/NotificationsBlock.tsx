import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { CustomText } from '@/components';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { markAsRead } from '@/store/slices/notificationsSlice';
import Animated, { 
  FadeInRight, 
  FadeOutLeft,
  SlideInRight 
} from 'react-native-reanimated';
import { IconButton } from 'react-native-paper';

const NotificationItem: FC<{ notification: Notification; onPress: () => void }> = ({ 
  notification, 
  onPress 
}) => {
  const { s, theme } = useStyles(styles);
  
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
      >
        <View style={s.notificationHeader}>
          <CustomText variant="ezH4Semi" style={s.notificationTitle}>
            {notification.title}
          </CustomText>
          <CustomText variant="ezSubtitleRegular" style={s.notificationTime}>
            {new Date(notification.timestamp).toLocaleTimeString()}
          </CustomText>
        </View>
        <CustomText variant="ezSubtitleRegular" style={s.notificationMessage}>
          {notification.message}
        </CustomText>
        {!notification.isRead && (
          <View style={s.unreadDot} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export const NotificationsBlock: FC = () => {
  const { s, theme } = useStyles(styles);
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(state => state.notifications.items);

  const handleNotificationPress = (id: string) => {
    dispatch(markAsRead(id));
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Animated.View 
      entering={FadeInRight.duration(1000)}
      style={s.container}
    >
      <View style={s.header}>
        <CustomText variant="ezH3Semi">Сповіщення</CustomText>
        <IconButton
          icon="bell-outline"
          size={24}
          iconColor={theme.colors.ezPrimary}
        />
      </View>
      <View style={s.notificationsList}>
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onPress={() => handleNotificationPress(notification.id)}
          />
        ))}
      </View>
    </Animated.View>
  );
}; 