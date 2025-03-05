import React from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useStyles} from '@/hooks';
import {CustomText} from '@/components';
import {Button, IconButton} from 'react-native-paper';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import Animated, {FadeIn, SlideInRight} from 'react-native-reanimated';
import {AppTheme} from '@/theme';
import {useCancelSessionMutation, useGetSessionByIdQuery} from '@/features/sessions/api';
import { getFullAvatarUrl } from '@/utils/getFullAvatarUrl';


const styles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.scale(16),
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.ezGrayBackground,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginRight: theme.scale(40), // Компенсація для кнопки назад
    },
    content: {
        padding: theme.scale(16),
    },
    psychologistCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(16),
        padding: theme.scale(16),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.scale(16),
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    avatar: {
        width: theme.scale(64),
        height: theme.scale(64),
        borderRadius: theme.scale(32),
        marginRight: theme.scale(16),
        borderWidth: 2,
        borderColor: theme.colors.ezPrimary,
    },
    psychologistInfo: {
        flex: 1,
    },
    psychologistName: {
        marginBottom: theme.scale(4),
    },
    specialization: {
        color: theme.colors.ezGrayDark,
        marginBottom: theme.scale(8),
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: theme.colors.ezPrimary,
        marginLeft: theme.scale(4),
    },
    sectionTitle: {
        marginTop: theme.scale(24),
        marginBottom: theme.scale(12),
    },
    detailsCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(16),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.scale(12),
    },
    detailIcon: {
        marginRight: theme.scale(12),
        width: theme.scale(24),
        alignItems: 'center',
    },
    detailLabel: {
        color: theme.colors.ezGrayDark,
        width: theme.scale(80),
    },
    detailValue: {
        flex: 1,
    },
    notesCard: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(16),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    notesText: {
        color: theme.colors.ezGrayDark,
        lineHeight: theme.scale(20),
    },
    buttonsContainer: {
        padding: theme.scale(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.ezGrayBackground,
    },
    button: {
        flex: 1,
        marginHorizontal: theme.scale(8),
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: theme.scale(12),
        paddingVertical: theme.scale(4),
        borderRadius: theme.scale(12),
        marginBottom: theme.scale(16),
    },
    statusText: {
        color: theme.colors.surface,
    },
});
const defaultAvatarUri = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export default function SessionDetailsScreen() {
    const {id} = useLocalSearchParams();
    const router = useRouter();
    const {s, theme} = useStyles(styles);

    const {data: session, isLoading, error} = useGetSessionByIdQuery(id as string);
    const [cancelSession, {isLoading: isCancelling}] = useCancelSessionMutation();
    if (isLoading) {
        return (
            <SafeAreaView style={s.container as any}>
                <View style={s.header as any}>
                    <IconButton icon="arrow-left" onPress={() => router.back()}/>
                    <CustomText variant="ezH4Semi" style={s.title}>
                        Деталі сесії
                    </CustomText>
                    <View style={{width: theme.scale(40)}}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <CustomText variant="ezSubtitleRegular">
                        Завантаження...
                    </CustomText>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !session) {
        return (
            <SafeAreaView style={s.container as any}>
                <View style={s.header as any}>
                    <IconButton icon="arrow-left" onPress={() => router.back()}/>
                    <CustomText variant="ezH4Semi" style={s.title}>
                        Деталі сесії
                    </CustomText>
                    <View style={{width: theme.scale(40)}}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <CustomText variant="ezSubtitleRegular">
                        Сесію не знайдено
                    </CustomText>
                </View>
            </SafeAreaView>
        );
    }

    const formattedDate = format(new Date(session.date), 'dd MMMM yyyy', {locale: uk});

    const getStatusColor = () => {
        switch (session.status) {
            case 'upcoming':
                return theme.colors.ezPrimary;
            case 'completed':
                return theme.colors.error;
            case 'cancelled':
                return theme.colors.error;
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
        <SafeAreaView style={s.container as any} edges={['top']}>
            <Animated.View entering={FadeIn.duration(300)} style={s.header as any}>
                <IconButton icon="arrow-left" onPress={() => router.back()}/>
                <CustomText variant="ezH4Semi" style={s.title}>
                    Деталі сесії
                </CustomText>
                <View style={{width: theme.scale(40)}}/>
            </Animated.View>

            <ScrollView>
                <View style={s.content}>
                    <Animated.View
                        entering={SlideInRight.duration(400).delay(100)}
                        style={[s.statusBadge, {backgroundColor: getStatusColor()}]}
                    >
                        <CustomText variant="ezSubtitleMedium" style={s.statusText}>
                            {getStatusText()}
                        </CustomText>
                    </Animated.View>

                    <Animated.View entering={SlideInRight.duration(400).delay(200)} style={s.psychologistCard}>
                        <Image
                            source={{uri: session.psychologistAvatar ? getFullAvatarUrl(session.psychologistAvatar) : defaultAvatarUri}}
                            style={s.avatar}/>
                        <View style={s.psychologistInfo}>
                            <CustomText variant="ezH4Semi" style={s.psychologistName}>
                                {session.psychologistName}
                            </CustomText>
                            <CustomText variant="ezSubtitleRegular" style={s.specialization}>
                                Клінічний психолог
                            </CustomText>
                            <View style={s.rating}>
                                <IconButton
                                    icon="star"
                                    size={16}
                                    iconColor="#FFD700"
                                    style={{margin: 0, padding: 0}}
                                />
                                <CustomText variant="ezSubtitleMedium" style={s.ratingText}>
                                    4.9
                                </CustomText>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View entering={SlideInRight.duration(400).delay(300)}>
                        <CustomText variant="ezH4Semi" style={s.sectionTitle}>
                            Деталі сесії
                        </CustomText>
                        <View style={s.detailsCard}>
                            <View style={s.detailRow}>
                                <View style={s.detailIcon}>
                                    <IconButton icon="calendar" size={20} iconColor={theme.colors.ezPrimary}
                                                style={{margin: 0}}/>
                                </View>
                                <CustomText variant="ezSubtitleRegular" style={s.detailLabel}>
                                    Дата:
                                </CustomText>
                                <CustomText variant="ezSubtitleMedium" style={s.detailValue}>
                                    {formattedDate}
                                </CustomText>
                            </View>

                            <View style={s.detailRow}>
                                <View style={s.detailIcon}>
                                    <IconButton icon="clock-outline" size={20} iconColor={theme.colors.ezPrimary}
                                                style={{margin: 0}}/>
                                </View>
                                <CustomText variant="ezSubtitleRegular" style={s.detailLabel}>
                                    Час:
                                </CustomText>
                                <CustomText variant="ezSubtitleMedium" style={s.detailValue}>
                                    {session.time}, {session.duration} хв
                                </CustomText>
                            </View>

                            <View style={s.detailRow}>
                                <View style={s.detailIcon}>
                                    <IconButton icon="cash" size={20} iconColor={theme.colors.ezPrimary}
                                                style={{margin: 0}}/>
                                </View>
                                <CustomText variant="ezSubtitleRegular" style={s.detailLabel}>
                                    Вартість:
                                </CustomText>
                                <CustomText variant="ezSubtitleMedium" style={s.detailValue}>
                                    {session.price} грн
                                </CustomText>
                            </View>

                            <View style={s.detailRow}>
                                <View style={s.detailIcon}>
                                    <IconButton icon="video" size={20} iconColor={theme.colors.ezPrimary}
                                                style={{margin: 0}}/>
                                </View>
                                <CustomText variant="ezSubtitleRegular" style={s.detailLabel}>
                                    Формат:
                                </CustomText>
                                <CustomText variant="ezSubtitleMedium" style={s.detailValue}>
                                    Відеозв'язок
                                </CustomText>
                            </View>
                        </View>
                    </Animated.View>

                    <Animated.View entering={SlideInRight.duration(400).delay(400)}>
                        <CustomText variant="ezH4Semi" style={s.sectionTitle}>
                            Нотатки
                        </CustomText>
                        <View style={s.notesCard}>
                            <CustomText variant="ezSubtitleRegular" style={s.notesText}>
                                {session.notes ? session.notes : 'Немає нотаток'}
                            </CustomText>
                        </View>
                    </Animated.View>

                </View>
            </ScrollView>

            {session.status === 'upcoming' && (
                <Animated.View entering={FadeIn.duration(400).delay(500)} style={s.buttonsContainer}>
                    <Button
                        mode="contained"
                        icon="calendar-edit"
                        style={s.button}
                        onPress={() => router.push(`/sessions/reschedule/${session.id}`)}
                    >
                        Перенести
                    </Button>
                    <Button
                        mode="contained"
                        icon="calendar-remove"
                        style={[s.button, s.cancelButton]}
                        onPress={handleCancelSession}
                        loading={isCancelling}
                    >
                        Скасувати
                    </Button>
                </Animated.View>
            )}
        </SafeAreaView>
    );
} 