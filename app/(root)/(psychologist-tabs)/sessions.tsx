import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, Chip, Divider, FAB, SegmentedButtons, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AppTheme} from '@/theme/theme';
import {useStyles} from '@/hooks';

interface SessionItem {
    id: number;
    studentName: string;
    date: string;
    time: string;
    duration: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    notes?: string;
}

export default function PsychologistSessions() {
    const {s, theme} = useStyles(styles);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Приклад даних для відображення
    const sessions: SessionItem[] = [
        {
            id: 1,
            studentName: 'Анна Коваленко',
            date: '2023-06-15',
            time: '14:00',
            duration: '50 хв',
            status: 'upcoming',
        },
        {
            id: 2,
            studentName: 'Іван Петренко',
            date: '2023-06-16',
            time: '10:30',
            duration: '50 хв',
            status: 'upcoming',
        },
        {
            id: 3,
            studentName: 'Марія Шевченко',
            date: '2023-06-10',
            time: '15:00',
            duration: '50 хв',
            status: 'completed',
            notes: 'Обговорили проблеми з тривожністю. Рекомендовано техніки дихання та медитації.'
        },
        {
            id: 4,
            studentName: 'Олег Сидоренко',
            date: '2023-06-08',
            time: '11:00',
            duration: '50 хв',
            status: 'completed',
            notes: 'Прогрес у подоланні соціальної тривожності. Продовжуємо працювати над впевненістю.'
        },
        {
            id: 5,
            studentName: 'Наталія Мельник',
            date: '2023-06-12',
            time: '16:30',
            duration: '50 хв',
            status: 'cancelled',
        },
    ];

    // Фільтрація сесій за статусом та датою
    const filteredSessions = sessions.filter(session => {
        const matchesStatus =
            (activeTab === 'upcoming' && session.status === 'upcoming') ||
            (activeTab === 'completed' && session.status === 'completed') ||
            (activeTab === 'cancelled' && session.status === 'cancelled');

        const matchesDate = !selectedDate || session.date === selectedDate;

        return matchesStatus && matchesDate;
    });

    // Отримання унікальних дат для фільтрації
    const uniqueDates = [...new Set(sessions
        .filter(session =>
            (activeTab === 'upcoming' && session.status === 'upcoming') ||
            (activeTab === 'completed' && session.status === 'completed') ||
            (activeTab === 'cancelled' && session.status === 'cancelled')
        )
        .map(session => session.date))];

    // Форматування дати для відображення
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {day: 'numeric', month: 'short'});
    };

    const renderSessionCard = (session: SessionItem) => (
        <Card key={session.id} style={s.sessionCard}>
            <Card.Content>
                <View style={s.sessionHeader}>
                    <View style={s.studentInfo}>
                        <Avatar.Text
                            size={40}
                            label={session.studentName.split(' ').map(n => n[0]).join('')}
                            color="white"
                            style={{backgroundColor: theme.colors.primary}}
                        />
                        <View style={{marginLeft: theme.xs}}>
                            <Text variant="titleMedium">{session.studentName}</Text>
                            <Text variant="bodyMedium">{formatDate(session.date)}, {session.time}</Text>
                        </View>
                    </View>
                    <Chip
                        mode="outlined"
                        style={[
                            s.statusChip,
                            {
                                backgroundColor:
                                    session.status === 'upcoming' ? theme.colors.primaryContainer :
                                        session.status === 'completed' ? '#D5F2DF' :
                                            '#FEE7E7'
                            }
                        ]}
                        textStyle={{
                            color:
                                session.status === 'upcoming' ? theme.colors.primary :
                                    session.status === 'completed' ? '#12B549' :
                                        '#D12F2C'
                        }}
                    >
                        {session.status === 'upcoming' ? 'Заплановано' :
                            session.status === 'completed' ? 'Завершено' : 'Скасовано'}
                    </Chip>
                </View>

                <Divider style={{marginVertical: theme.s}}/>

                <View style={s.sessionDetails}>
                    <View style={s.detailItem}>
                        <MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.primary}/>
                        <Text variant="bodyMedium" style={{marginLeft: theme.xs}}>{session.duration}</Text>
                    </View>

                    {session.notes && (
                        <View style={s.notesContainer}>
                            <Text variant="bodySmall" style={{color: theme.colors.outline}}>Нотатки:</Text>
                            <Text variant="bodyMedium">{session.notes}</Text>
                        </View>
                    )}
                </View>

                <View style={s.actionButtons}>
                    {session.status === 'upcoming' && (
                        <>
                            <Button
                                mode="contained"
                                onPress={() => {/* Логіка для початку сесії */
                                }}
                                style={s.actionButton}
                                icon="video"
                            >
                                Почати
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => {/* Логіка для скасування */
                                }}
                                style={s.actionButton}
                                textColor={theme.colors.error}
                            >
                                Скасувати
                            </Button>
                        </>
                    )}

                    {session.status === 'completed' && (
                        <Button
                            mode="outlined"
                            onPress={() => {/* Логіка для перегляду деталей */
                            }}
                            style={s.actionButton}
                            icon="note-text-outline"
                        >
                            Деталі
                        </Button>
                    )}

                    {session.status === 'cancelled' && (
                        <Button
                            mode="outlined"
                            onPress={() => {/* Логіка для перепланування */
                            }}
                            style={s.actionButton}
                            icon="calendar-refresh"
                        >
                            Перепланувати
                        </Button>
                    )}
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <Text variant="headlineMedium" style={s.headerTitle}>Сесії</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="calendar-month" size={24} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>

            <SegmentedButtons
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    {value: 'upcoming', label: 'Заплановані'},
                    {value: 'completed', label: 'Завершені'},
                    {value: 'cancelled', label: 'Скасовані'},
                ]}
                style={s.segmentedButtons}
            />

            {uniqueDates.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={s.dateFiltersContainer}
                >
                    <Chip
                        selected={selectedDate === null}
                        onPress={() => setSelectedDate(null)}
                        style={s.dateChip}
                        selectedColor={theme.colors.primary}
                    >
                        Всі дати
                    </Chip>
                    {uniqueDates.map(date => (
                        <Chip
                            key={date}
                            selected={selectedDate === date}
                            onPress={() => setSelectedDate(date)}
                            style={s.dateChip}
                            selectedColor={theme.colors.primary}
                        >
                            {formatDate(date)}
                        </Chip>
                    ))}
                </ScrollView>
            )}

            <ScrollView contentContainerStyle={s.content}>
                {filteredSessions.length > 0 ? (
                    filteredSessions.map(renderSessionCard)
                ) : (
                    <View style={s.emptyContainer}>
                        <MaterialCommunityIcons
                            name="calendar-blank"
                            size={64}
                            color={theme.colors.outline}
                        />
                        <Text variant="titleMedium" style={s.emptyText}>
                            Немає сесій
                        </Text>
                        <Text variant="bodyMedium" style={s.emptySubtext}>
                            {activeTab === 'upcoming'
                                ? 'У вас немає запланованих сесій'
                                : activeTab === 'completed'
                                    ? 'У вас немає завершених сесій'
                                    : 'У вас немає скасованих сесій'}
                        </Text>
                    </View>
                )}
            </ScrollView>

            <FAB
                icon="plus"
                style={s.fab}
                onPress={() => {/* Логіка для створення нової сесії */
                }}
                color="white"
            />
        </SafeAreaView>
    );
}

export const styles = (theme: AppTheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.scale(16),
        backgroundColor: theme.colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.ezGrayBackground,
    },
    headerTitle: {
        color: theme.colors.ezPrimary,
        fontWeight: 'bold',
    },
    segmentedButtons: {
        marginHorizontal: theme.m,
        marginBottom: theme.xs,
    },
    dateFiltersContainer: {
        paddingHorizontal: theme.m,
        paddingBottom: theme.xs,
        height: theme.scale(40),
    },
    dateChip: {
        marginRight: theme.xs,
        backgroundColor: "#f8ffff",
    },
    content: {
        // flex: 1,
        padding: theme.scale(16),
    },
    sessionCard: {
        marginBottom: theme.scale(16),
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(12),
        elevation: 2,
        shadowColor: theme.colors.ezBlack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.scale(8),
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusChip: {
        borderWidth: 0,
    },
    sessionDetails: {
        marginBottom: theme.scale(12),
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.scale(4),
    },
    notesContainer: {
        marginTop: theme.scale(8),
        padding: theme.scale(12),
        backgroundColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(8),
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: theme.scale(12),
    },
    actionButton: {
        marginLeft: theme.scale(8),
    },
    fab: {
        position: 'absolute',
        right: theme.scale(16),
        bottom: theme.scale(16),
        backgroundColor: theme.colors.ezPrimary,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.scale(32),
    },
    emptyText: {
        marginTop: theme.scale(16),
        textAlign: 'center',
        color: theme.colors.ezGrayDark,
    },
    emptySubtext: {
        marginTop: theme.scale(8),
        textAlign: 'center',
        color: theme.colors.ezGrayDark,
    },
}); 