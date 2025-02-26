import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { CustomText } from '@/components';
import { Session } from '@/features/sessions/types';
import { useRouter } from 'expo-router';
import { IconButton, Badge } from 'react-native-paper';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SessionCardProps {
  session: Session;
}

export const SessionCard: FC<SessionCardProps> = ({ session }) => {
  const { s, theme } = useStyles(styles);
  const router = useRouter();

  const formattedDate = format(new Date(session.date), 'dd MMMM yyyy', { locale: uk });
  
  const getStatusColor = () => {
    switch (session.status) {
      case 'upcoming':
        return theme.colors.ezPrimary;
      case 'completed':
        return theme.colors.ezSuccess;
      case 'cancelled':
        return theme.colors.ezError;
      default:
        return theme.colors.ezGrayDark;
    }
  };

  const getStatusText = () => {
    switch (session.status) {
      case 'upcoming':
        return 'Заплановано';
      case 'completed':
        return 'Завершено';
      case 'cancelled':
        return 'Скасовано';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity 
      style={s.container}
      onPress={() => router.push(`/(root)/sessions/${session.id}`)}
    >
      <View style={s.header}>
        <View style={s.psychologistInfo}>
          <Image source={{ uri: session.psychologistAvatar }} style={s.avatar} />
          <View>
            <CustomText variant="ezSubtitleMedium" style={s.psychologistName}>
              {session.psychologistName}
            </CustomText>
            <Badge style={[s.statusBadge, { backgroundColor: getStatusColor() }]}>
              {getStatusText()}
            </Badge>
          </View>
        </View>
        <IconButton 
          icon="dots-vertical" 
          size={20}
          iconColor={theme.colors.ezGrayDark}
          onPress={() => {}}
        />
      </View>
      
      <View style={s.content}>
        <View style={s.infoRow}>
          <View style={s.infoItem}>
            <IconButton 
              icon="calendar" 
              size={20}
              iconColor={theme.colors.ezPrimary}
              style={s.infoIcon}
            />
            <CustomText variant="ezSubtitleRegular">
              {formattedDate}
            </CustomText>
          </View>
          
          <View style={s.infoItem}>
            <IconButton 
              icon="clock-outline" 
              size={20}
              iconColor={theme.colors.ezPrimary}
              style={s.infoIcon}
            />
            <CustomText variant="ezSubtitleRegular">
              {session.time}, {session.duration} хв
            </CustomText>
          </View>
        </View>
        
        <View style={s.priceContainer}>
          <CustomText variant="ezSubtitleRegular" style={s.priceLabel}>
            Вартість:
          </CustomText>
          <CustomText variant="ezSubtitleMedium" style={s.price}>
            {session.price} грн
          </CustomText>
        </View>
      </View>
      
      {session.status === 'upcoming' && (
        <View style={s.actions}>
          <TouchableOpacity style={s.actionButton}>
            <MaterialCommunityIcons name="calendar-edit" size={20} color={theme.colors.ezPrimary} />
            <CustomText variant="ezSubtitleMedium" style={s.actionButtonText}>
              Перенести
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionButton, s.cancelButton]}>
            <MaterialCommunityIcons name="calendar-remove" size={20} color={theme.colors.ezError} />
            <CustomText variant="ezSubtitleMedium" style={s.cancelButtonText}>
              Скасувати
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}; 