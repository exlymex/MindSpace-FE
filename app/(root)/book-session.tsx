import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRouter} from 'expo-router';
import {useStyles} from '@/hooks';
import {CustomText} from '@/components';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {useBookSessionMutation} from '@/features/sessions/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {AppTheme} from '@/theme';

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
    content: {
        padding: theme.scale(16),
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginRight: theme.scale(40),
    },
    input: {
        marginBottom: theme.scale(16),
    },
    dateButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
    },
    timeButton: {
        borderWidth: 1,
        borderColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        marginBottom: theme.scale(16),
    },
});

export default function BookSessionScreen() {
    const {s, theme} = useStyles(styles);
    const router = useRouter();
    const [bookSession, {isLoading}] = useBookSessionMutation();

    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [duration, setDuration] = useState('60');
    const [psychologistId, setPsychologistId] = useState('');

    const handleBookSession = async () => {
        try {
            await bookSession({
                psychologistId,
                date: format(date, 'yyyy-MM-dd'),
                time: format(time, 'HH:mm'),
                duration: parseInt(duration),
                price: 800, // Тимчасово хардкодимо ціну
            }).unwrap();

            router.push('/sessions');
        } catch (error) {
            console.error('Failed to book session:', error);
        }
    };

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <IconButton icon="arrow-left" onPress={() => router.back()}/>
                <CustomText variant="ezH4Semi" style={s.title}>
                    Бронювання сесії
                </CustomText>
                <View style={{width: theme.scale(40)}}/>
            </View>

            <ScrollView style={s.content}>
                <TextInput
                    label="ID Психолога"
                    value={psychologistId}
                    onChangeText={setPsychologistId}
                    style={s.input}
                />

                <TouchableOpacity
                    style={s.dateButton}
                    onPress={() => setShowDatePicker(true)}
                >
                    <CustomText>
                        Дата: {format(date, 'dd MMMM yyyy', {locale: uk})}
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
                    style={{marginTop: theme.scale(16)}}
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
        </SafeAreaView>
    );
} 