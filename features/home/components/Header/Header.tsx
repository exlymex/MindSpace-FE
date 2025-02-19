import React, { FC } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { CustomText } from '@/components';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import Animated, { FadeIn } from 'react-native-reanimated';

interface HeaderProps {
  username?: string;
}

export const Header: FC<HeaderProps> = ({ username = 'Користувач' }) => {
  const { s, theme } = useStyles(styles);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <Animated.View 
      entering={FadeIn.duration(1000)}
      style={s.container}
    >
      <View style={s.rightContainer}>
        <IconButton
          icon="logout"
          iconColor={theme.colors.ezPrimary}
          size={24}
          onPress={handleLogout}
          style={s.logoutButton}
        />
      </View>
      <CustomText variant="ezH2Semi" style={s.greeting}>
        Вітаємо, {username}!
      </CustomText>
    </Animated.View>
  );
}; 