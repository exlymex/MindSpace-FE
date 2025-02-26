import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { CustomText } from '@/components';
import { IconButton } from 'react-native-paper';
import Animated, { FadeIn } from 'react-native-reanimated';

export const SessionsHeader: FC = () => {
  const { s, theme } = useStyles(styles);

  return (
    <Animated.View 
      entering={FadeIn.duration(500)}
      style={s.container}
    >
      <View style={s.titleContainer}>
        <CustomText variant="ezH3Semi" style={s.title}>
          Мої сесії
        </CustomText>
        <CustomText variant="ezSubtitleRegular" style={s.subtitle}>
          Керуйте своїми консультаціями з психологами
        </CustomText>
      </View>
      
      <View style={s.actionsContainer}>
        <IconButton
          icon="calendar-plus"
          size={24}
          iconColor={theme.colors.ezPrimary}
          style={s.actionButton}
          onPress={() => {}}
        />
        <IconButton
          icon="filter-variant"
          size={24}
          iconColor={theme.colors.ezPrimary}
          style={s.actionButton}
          onPress={() => {}}
        />
      </View>
    </Animated.View>
  );
}; 