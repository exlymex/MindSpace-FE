import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import {useStyles} from '@/hooks';
import {CustomText, ErrorMessage, LoadingIndicator} from '@/components';
import {Button, Card, Chip, IconButton, TextInput} from 'react-native-paper';
import {useBookSessionMutation} from '@/features/sessions/api';
import {useGetPsychologistsQuery} from '@/features/psychologists/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format, addMinutes, isAfter, isBefore, startOfDay, endOfDay} from 'date-fns';
import {uk} from 'date-fns/locale';
import {styles} from './styles';
import { PsychologistListItem } from '@/features/psychologists/types';

interface BookSessionModalProps {
    visible: boolean;
    onClose: () => void;
}

// Доступні слоти часу (можна винести в окремий конфіг)
const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Доступні тривалості сесій
const DURATION_OPTIONS = [
    { label: '30 хвилин', value: '30' },
    { label: '45 хвилин', value: '45' },
    { label: '60 хвилин', value: '60' },
    { label: '90 хвилин', value: '90' },
];

export const BookSessionModal: React.FC<BookSessionModalProps> = ({visible, onClose}) => {
    const {s, theme} = useStyles(styles);
    const [bookSession, {isLoading: isBookingLoading}] = useBookSessionMutation();
    const {data: psychologists, isLoading: isLoadingPsychologists, error: psychologistsError} = useGetPsychologistsQuery();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
    const [duration, setDuration] = useState('60');
    const [selectedPsychologist, setSelectedPsychologist] = useState<{ id: string; name: string } | null>(null);
    const [step, setStep] = useState(1); // 1: вибір психолога, 2: вибір дати і часу

    // Перевірка, чи можна перейти до наступного кроку
    const canProceedToStep2 = selectedPsychologist !== null;
    const canBookSession = selectedTimeSlot !== null && selectedPsychologist !== null;

    // Обробник вибору психолога
    const handleSelectPsychologist = (psych: PsychologistListItem) => {
        setSelectedPsychologist({
            id: psych.id,
            name: psych.fullName
        });
    };

    // Обробник вибору слоту часу
    const handleSelectTimeSlot = (slot: string) => {
        setSelectedTimeSlot(slot);
    };

    // Обробник бронювання сесії
    const handleBookSession = async () => {
        if (!selectedPsychologist || !selectedTimeSlot) {
            Alert.alert('Помилка', 'Будь ласка, оберіть психолога, дату та час');
            return;
        }

        try {
            // Створюємо об'єкт з даними для бронювання
            const sessionData = {
                psychologist_id: parseInt(selectedPsychologist.id),
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTimeSlot,
                duration: parseInt(duration),
                price: 800, // Тимчасово хардкодимо ціну
            };

            console.log('Sending session data:', sessionData); // Для дебагу

            // Відправляємо запит на бронювання
            await bookSession(sessionData).unwrap();
            
            // Закриваємо модальне вікно і показуємо повідомлення про успіх
            onClose();
            Alert.alert('Успіх', 'Сесію успішно заброньовано');
        } catch (error) {
            console.error('Failed to book session:', error);
            Alert.alert('Помилка', 'Не вдалося забронювати сесію. Спробуйте ще раз.');
        }
    };

    // Перевірка, чи доступний слот часу (можна додати перевірку з бекенду)
    const isTimeSlotAvailable = (slot: string) => {
        // Тут можна додати логіку перевірки доступності слоту
        // Наприклад, запит до API для перевірки, чи вільний цей час у психолога
        return true;
    };

    // Рендер списку психологів
    const renderPsychologists = () => {
        if (isLoadingPsychologists) {
            return <LoadingIndicator />;
        }

        if (psychologistsError) {
            return <ErrorMessage message="Помилка завантаження психологів" />;
        }

        if (!psychologists || psychologists.length === 0) {
            return <ErrorMessage message="Психологів не знайдено" />;
        }

        return (
            <FlatList
                data={psychologists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Card
                        style={[
                            s.psychologistCard,
                            selectedPsychologist?.id === item.id && s.selectedPsychologistCard
                        ]}
                        onPress={() => handleSelectPsychologist(item)}
                    >
                        <Card.Content>
                            <CustomText variant="ezH4Semi">
                                {item.fullName}
                            </CustomText>
                            <CustomText variant="ezSubtitleRegular" style={s.specialization}>
                                {item.specialization}
                            </CustomText>
                            <CustomText variant="ezCaptionMedium" style={s.experience}>
                                Досвід: {item.experience}
                            </CustomText>
                        </Card.Content>
                    </Card>
                )}
                contentContainerStyle={s.psychologistsList}
            />
        );
    };

    // Рендер слотів часу
    const renderTimeSlots = () => {
        return (
            <View style={s.timeSlotsContainer}>
                <CustomText variant="ezH4Semi" style={s.sectionTitle}>
                    Час сесії
                </CustomText>
                <View style={s.timeSlotsContent}>
                    {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        // Тут можна додати логіку для визначення недоступних слотів
                        const isDisabled = false;

                        return (
                            <Chip
                                key={slot}
                                style={[
                                    s.timeSlotChip,
                                    isSelected && s.selectedTimeSlotChip,
                                    isDisabled && s.disabledTimeSlotChip
                                ]}
                                textStyle={[
                                    s.timeSlotText,
                                    isSelected && s.selectedTimeSlotText
                                ]}
                                disabled={isDisabled}
                                onPress={() => handleSelectTimeSlot(slot)}
                            >
                                {slot}
                            </Chip>
                        );
                    })}
                </View>
            </View>
        );
    };

    // Рендер опцій тривалості
    const renderDurationOptions = () => {
        return (
            <View style={s.durationContainer}>
                <CustomText variant="ezH4Semi" style={s.sectionTitle}>
                    Тривалість сесії
                </CustomText>
                <FlatList
                    data={DURATION_OPTIONS}
                    keyExtractor={(item) => item.value}
                    renderItem={({item}) => (
                        <Chip
                            style={[
                                s.durationChip,
                                duration === item.value && s.selectedDurationChip
                            ]}
                            textStyle={[
                                s.durationText,
                                duration === item.value && s.selectedDurationText
                            ]}
                            onPress={() => setDuration(item.value)}
                        >
                            {item.label}
                        </Chip>
                    )}
                    horizontal
                    contentContainerStyle={s.durationContent}
                />
            </View>
        );
    };

    // Рендер календаря для вибору дати
    const renderDatePicker = () => {
        // Отримуємо наступні 30 днів для вибору
        const nextDays = getNextDays(30);
        
        return (
            <View style={s.dateContainer}>
                <CustomText variant="ezH4Semi" style={s.sectionTitle}>
                    Дата сесії
                </CustomText>
                
                <View style={s.calendarContainer}>
                    <FlatList
                        data={nextDays}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.toISOString()}
                        renderItem={({item}) => {
                            const isSelected = 
                                item.getDate() === selectedDate.getDate() && 
                                item.getMonth() === selectedDate.getMonth() && 
                                item.getFullYear() === selectedDate.getFullYear();
                            
                            const isToday = 
                                item.getDate() === new Date().getDate() && 
                                item.getMonth() === new Date().getMonth() && 
                                item.getFullYear() === new Date().getFullYear();
                            
                            return (
                                <TouchableOpacity
                                    style={[
                                        s.dayItem,
                                        isSelected && s.selectedDayItem,
                                        isToday && s.todayItem
                                    ]}
                                    onPress={() => setSelectedDate(item)}
                                >
                                    <CustomText 
                                        variant="ezSubtitleMedium" 
                                        style={[
                                            s.dayName,
                                            isSelected && s.selectedDayText
                                        ]}
                                    >
                                        {format(item, 'EEE', {locale: uk})}
                                    </CustomText>
                                    <CustomText 
                                        variant="ezH4Semi" 
                                        style={[
                                            s.dayNumber,
                                            isSelected && s.selectedDayText
                                        ]}
                                    >
                                        {format(item, 'd')}
                                    </CustomText>
                                    <CustomText 
                                        variant="ezCaptionMedium" 
                                        style={[
                                            s.monthName,
                                            isSelected && s.selectedDayText
                                        ]}
                                    >
                                        {format(item, 'MMM', {locale: uk})}
                                    </CustomText>
                                </TouchableOpacity>
                            );
                        }}
                        contentContainerStyle={s.daysContainer}
                    />
                </View>
                
                <View style={s.selectedDateContainer}>
                    <IconButton
                        icon="calendar"
                        size={20}
                        iconColor={theme.colors.ezPrimary}
                        style={s.dateIcon}
                    />
                    <CustomText variant="ezSubtitleRegular" style={s.selectedDateText}>
                        Обрана дата: {format(selectedDate, 'dd MMMM yyyy', {locale: uk})}
                    </CustomText>
                </View>
            </View>
        );
    };

    // Функція для отримання наступних N днів
    const getNextDays = (days: number) => {
        const result = [];
        const today = new Date();
        
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(today.getDate() + i);
            result.push(date);
        }
        
        return result;
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <View style={s.modalContainer}>
                <View style={s.modalContent}>
                    <View style={s.header}>
                        {step === 2 ? (
                            <IconButton icon="arrow-left" onPress={() => setStep(1)} />
                        ) : (
                            <IconButton icon="close" onPress={onClose} />
                        )}
                        <CustomText variant="ezH4Semi" style={s.title}>
                            {step === 1 ? 'Оберіть психолога' : 'Бронювання сесії'}
                        </CustomText>
                        <View style={{width: theme.scale(40)}} />
                    </View>

                    {step === 1 ? (
                        // Крок 1: Вибір психолога
                        <View style={s.stepContainer}>
                            {isLoadingPsychologists ? (
                                <LoadingIndicator />
                            ) : psychologists && psychologists.length > 0 ? (
                                <FlatList
                                    data={psychologists}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({item}) => (
                                        <Card
                                            style={[
                                                s.psychologistCard,
                                                selectedPsychologist?.id === item.id && s.selectedPsychologistCard
                                            ]}
                                            onPress={() => handleSelectPsychologist(item)}
                                        >
                                            <Card.Content>
                                                <CustomText variant="ezH4Semi">
                                                    {item.fullName}
                                                </CustomText>
                                                <CustomText variant="ezSubtitleRegular" style={s.specialization}>
                                                    {item.specialization}
                                                </CustomText>
                                                <CustomText variant="ezCaptionMedium" style={s.experience}>
                                                    Досвід: {item.experience}
                                                </CustomText>
                                            </Card.Content>
                                        </Card>
                                    )}
                                    contentContainerStyle={s.psychologistsList}
                                />
                            ) : (
                                <ErrorMessage message="Психологів не знайдено" />
                            )}

                            <Button
                                mode="contained"
                                onPress={() => setStep(2)}
                                style={s.nextButton}
                                disabled={!canProceedToStep2}
                            >
                                Далі
                            </Button>
                        </View>
                    ) : (
                        // Крок 2: Вибір дати і часу
                        <ScrollView style={s.stepContainer} contentContainerStyle={s.scrollContent}>
                            <View style={s.psychologistInfo}>
                                <CustomText variant="ezH4Semi">
                                    Психолог: {selectedPsychologist?.name}
                                </CustomText>
                            </View>

                            {renderDatePicker()}
                            {renderTimeSlots()}
                            {renderDurationOptions()}

                            <Button
                                mode="contained"
                                onPress={handleBookSession}
                                loading={isBookingLoading}
                                style={s.submitButton}
                                disabled={!canBookSession}
                            >
                                Забронювати сесію
                            </Button>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
}; 