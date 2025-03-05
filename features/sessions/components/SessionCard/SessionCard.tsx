import React, {FC} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {CustomText, CustomBadge} from '@/components';
import {Session} from '@/features/sessions/types';
import {useRouter} from 'expo-router';
import {IconButton} from 'react-native-paper';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useCancelSessionMutation} from '@/features/sessions/api';
import { getFullAvatarUrl } from '@/utils/getFullAvatarUrl';

interface SessionCardProps {
    session: Session;
}

export const SessionCard: FC<SessionCardProps> = ({session}) => {
    const {s, theme} = useStyles(styles);
    const router = useRouter();
    const [cancelSession, {isLoading: isCancelling}] = useCancelSessionMutation();

    const formattedDate = format(new Date(session.date), 'dd MMMM yyyy', {locale: uk});
    
    // Дефолтне зображення для психолога
    const defaultAvatarUri = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

    const getStatusColor = () => {
        switch (session.status) {
            case 'upcoming':
                return theme.colors.ezPrimary;
            case 'completed':
                return theme.colors.ezGreen;
            case 'cancelled':
                return theme.colors.ezRed;
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

    const handleCancelSession = () => {
        Alert.alert(
            'Скасування сесії',
            'Ви впевнені, що хочете скасувати цю сесію?',
            [
                {text: 'Ні', style: 'cancel'},
                {
                    text: 'Так',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await cancelSession(session.id).unwrap();
                            Alert.alert('Успіх', 'Сесію успішно скасовано');
                        } catch (error) {
                            Alert.alert('Помилка', 'Не вдалося скасувати сесію');
                        }
                    }
                }
            ]
        );
    };

    return (
        <TouchableOpacity
            style={s.container}
            onPress={() => router.push(`/(root)/sessions/${session.id}`)}
        >
            <View style={s.header}>
                <View style={s.psychologistInfo}>
                    <Image 
                        source={{uri: session.psychologistAvatar ? getFullAvatarUrl(session.psychologistAvatar) : defaultAvatarUri}} 
                        style={s.avatar}
                        defaultSource={{uri: defaultAvatarUri}}
                    />
                    <View>
                        <CustomText variant="ezSubtitleMedium" style={s.psychologistName}>
                            {session.psychologistName}
                        </CustomText>
                        <CustomBadge 
                            text={getStatusText()} 
                            backgroundColor={getStatusColor()}
                        />
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

            </View>

            {session.status === 'upcoming' && (
                <View style={s.actions}>
                    <TouchableOpacity
                        style={s.actionButton}
                        onPress={() => router.push(`/(root)/sessions/edit/${session.id}`)}
                    >
                        <MaterialCommunityIcons name="calendar-edit" size={20} color={theme.colors.ezPrimary}/>
                        <CustomText variant="ezSubtitleMedium" style={s.actionButtonText}>
                            Перенести
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[s.actionButton, s.cancelButton]}
                        onPress={handleCancelSession}
                        disabled={isCancelling}
                    >
                        <MaterialCommunityIcons name="calendar-remove" size={20} color={theme.colors.error}/>
                        <CustomText variant="ezSubtitleMedium" style={s.cancelButtonText}>
                            Скасувати
                        </CustomText>
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
}; 