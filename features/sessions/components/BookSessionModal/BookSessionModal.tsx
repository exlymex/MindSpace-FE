import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useStyles } from '@/hooks';
import { CustomText } from '@/components';
import { Button, TextInput, IconButton, Menu, Divider } from 'react-native-paper';
import { useBookSessionMutation } from '@/features/sessions/api';
import { useGetPsychologistsQuery } from '@/features/psychologists/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { styles } from './styles';

interface BookSessionModalProps {
    visible: boolean;
    onClose: () => void;
}

export const BookSessionModal: React.FC<BookSessionModalProps> = ({ visible, onClose }) => {
    const { s, theme } = useStyles(styles);
    const [bookSession, { isLoading }] = useBookSessionMutation();
    const { data: psychologists, isLoading: isLoadingPsychologists } = useGetPsychologistsQuery();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [duration, setDuration] = useState('60');
    const [selectedPsychologist, setSelectedPsychologist] = useState<{ id: string; name: string } | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const handleBookSession = async () => {
        if (!selectedPsychologist) {
            Alert.alert('Помилка', 'Будь ласка, оберіть психолога');
            return;
        }

        try {
            await bookSession({
                psychologist_id: parseInt(selectedPsychologist.id),
                date: format(date, 'yyyy-MM-dd'),
                time: format(time, 'HH:mm'),
                duration: parseInt(duration),
                price: 800,
            }).unwrap();
            
            onClose();
            Alert.alert('Успіх', 'Сесію успішно заброньовано');
        } catch (error) {
            console.error('Failed to book session:', error);
            Alert.alert('Помилка', 'Не вдалося забронювати сесію');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={s.modalContainer}>
                <View style={s.modalContent}>
                    <View style={s.header}>
                        <IconButton icon="close" onPress={onClose} />
                        <CustomText variant="ezH4Semi" style={s.title}>
                            Бронювання сесії
                        </CustomText>
                        <View style={{ width: theme.scale(40) }} />
                    </View>

                    <ScrollView style={s.form}>
                        <Menu
                            visible={menuVisible}
                            onDismiss={() => setMenuVisible(false)}
                            anchor={
                                <TouchableOpacity
                                    style={s.psychologistButton}
                                    onPress={() => setMenuVisible(true)}
                                >
                                    <CustomText>
                                        {selectedPsychologist 
                                            ? `Психолог: ${selectedPsychologist.name}` 
                                            : 'Оберіть психолога'}
                                    </CustomText>
                                </TouchableOpacity>
                            }
                        >
                            {isLoadingPsychologists ? (
                                <Menu.Item title="Завантаження..." />
                            ) : psychologists && psychologists.length > 0 ? (
                                psychologists.map((psych) => (
                                    <Menu.Item
                                        key={psych.id}
                                        title={psych.username}
                                        onPress={() => {
                                            setSelectedPsychologist({
                                                id: psych.id,
                                                name: psych.username
                                            });
                                            setMenuVisible(false);
                                        }}
                                    />
                                ))
                            ) : (
                                <Menu.Item title="Психологів не знайдено" />
                            )}
                        </Menu>

                        <TouchableOpacity
                            style={s.dateButton}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <CustomText>
                                Дата: {format(date, 'dd MMMM yyyy', { locale: uk })}
                            </CustomText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={s.timeButton}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <CustomText>
                                Час: {format(time, 'HH:mm')}
                            </CustomText>
                        </TouchableOpacity>

                        <TextInput
                            label="Тривалість (хвилин)"
                            value={duration}
                            onChangeText={setDuration}
                            keyboardType="numeric"
                            style={s.input}
                        />

                        <Button
                            mode="contained"
                            onPress={handleBookSession}
                            loading={isLoading}
                            style={s.submitButton}
                            disabled={!selectedPsychologist}
                        >
                            Забронювати сесію
                        </Button>
                    </ScrollView>

                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
                            mode="time"
                            onChange={(event, selectedDate) => {
                                setShowTimePicker(false);
                                if (selectedDate) {
                                    setTime(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
            </View>
        </Modal>
    );
}; 