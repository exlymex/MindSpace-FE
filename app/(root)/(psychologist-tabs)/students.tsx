import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Button, Card, Chip, Divider, Searchbar, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AppTheme} from '@/theme/theme';
import {router} from 'expo-router';
import {useStyles} from '@/hooks';

interface StudentItem {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive';
    lastSession: string | null;
    nextSession: string | null;
    notes: string | null;
    tags: string[];
}

export default function PsychologistStudents() {
    const {s, theme} = useStyles(styles);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Приклад даних для відображення
    const students: StudentItem[] = [
        {
            id: 1,
            name: 'Марія Шевченко',
            email: 'maria.shevchenko@example.com',
            phone: '+380991234567',
            status: 'active',
            lastSession: '2023-06-10',
            nextSession: '2023-06-17',
            notes: 'Працюємо над тривожністю та стресом',
            tags: ['Тривожність', 'Стрес']
        },
        {
            id: 2,
            name: 'Олег Сидоренко',
            email: 'oleg.sydorenko@example.com',
            phone: '+380991234568',
            status: 'active',
            lastSession: '2023-06-08',
            nextSession: '2023-06-15',
            notes: 'Соціальна тривожність, проблеми з комунікацією',
            tags: ['Тривожність', 'Соціалізація']
        },
        {
            id: 3,
            name: 'Наталія Мельник',
            email: 'natalia.melnyk@example.com',
            phone: '+380991234569',
            status: 'inactive',
            lastSession: '2023-05-20',
            nextSession: null,
            notes: 'Депресивні стани, потребує регулярних сесій',
            tags: ['Депресія', 'Самотність']
        },
        {
            id: 4,
            name: 'Іван Петренко',
            email: 'ivan.petrenko@example.com',
            phone: '+380991234570',
            status: 'active',
            lastSession: '2023-06-05',
            nextSession: '2023-06-19',
            notes: 'Проблеми з самооцінкою та впевненістю',
            tags: ['Самооцінка', 'Впевненість']
        },
        {
            id: 5,
            name: 'Анна Коваленко',
            email: 'anna.kovalenko@example.com',
            phone: '+380991234571',
            status: 'active',
            lastSession: '2023-06-12',
            nextSession: '2023-06-26',
            notes: 'Проблеми з концентрацією та увагою',
            tags: ['Концентрація', 'Увага', 'Навчання']
        },
    ];

    // Отримання всіх унікальних тегів
    const allTags = [...new Set(students.flatMap(student => student.tags))];

    // Фільтрація студентів за пошуком та тегами
    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = !selectedTag || student.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    // Форматування дати для відображення
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Не заплановано';
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {day: 'numeric', month: 'short', year: 'numeric'});
    };

    const renderStudentCard = ({item}: { item: StudentItem }) => (
        <Card style={s.studentCard}>
            <Card.Content>
                <View style={s.studentHeader}>
                    <View style={s.studentInfo}>
                        <Avatar.Text
                            size={50}
                            label={item.name.split(' ').map(n => n[0]).join('')}
                            color="white"
                            style={{backgroundColor: theme.colors.primary}}
                        />
                        <View style={{marginLeft: theme.s, gap: 12}}>
                            <Text variant="titleMedium">{item.name}</Text>
                            <Text variant="bodyMedium">{item.email}</Text>
                            <Text variant="bodySmall">{item.phone}</Text>
                        </View>
                    </View>
                    <Chip
                        mode="outlined"
                        style={[
                            s.statusChip,
                            {
                                backgroundColor: item.status === 'active' ? '#D5F2DF' : '#FEE7E7'
                            }
                        ]}
                        textStyle={{
                            color: item.status === 'active' ? '#12B549' : '#D12F2C'
                        }}
                    >
                        {item.status === 'active' ? 'Активний' : 'Неактивний'}
                    </Chip>
                </View>

                <Divider style={{marginVertical: theme.s}}/>

                <View style={s.sessionInfo}>
                    <View style={s.infoRow}>
                        <Text variant="bodyMedium" style={s.infoLabel}>Остання сесія:</Text>
                        <Text variant="bodyMedium">{formatDate(item.lastSession)}</Text>
                    </View>
                    <View style={s.infoRow}>
                        <Text variant="bodyMedium" style={s.infoLabel}>Наступна сесія:</Text>
                        <Text variant="bodyMedium">{formatDate(item.nextSession)}</Text>
                    </View>
                </View>

                {item.notes && (
                    <View style={s.notesContainer}>
                        <Text variant="bodySmall" style={{color: theme.colors.outline}}>Нотатки:</Text>
                        <Text variant="bodyMedium" numberOfLines={2}>{item.notes}</Text>
                    </View>
                )}

                <View style={s.tagsContainer}>
                    {item.tags.map(tag => (
                        <Chip
                            key={tag}
                            style={s.tag}
                            onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
                            selected={tag === selectedTag}
                            selectedColor={theme.colors.primary}
                            compact
                        >
                            {tag}
                        </Chip>
                    ))}
                </View>

                <View style={s.actionButtons}>
                    <Button
                        mode="contained"
                        onPress={() => router.push({pathname: '/chat', params: {studentId: item.id}} as any)}
                        style={s.actionButton}
                        icon="chat"
                    >
                        Чат
                    </Button>
                    <Button
                        mode="outlined"
                        onPress={() => {/* Логіка для планування сесії */
                        }}
                        style={s.actionButton}
                        icon="calendar-plus"
                    >
                        Сесія
                    </Button>
                    <Button
                        mode="text"
                        onPress={() => {/* Логіка для перегляду профілю */
                        }}
                        style={s.actionButton}
                        icon="account-details"
                    >
                        Профіль
                    </Button>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <Text variant="headlineMedium" style={s.headerTitle}>Студенти</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="filter-variant" size={24} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>

            <Searchbar
                placeholder="Пошук студентів"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={s.searchbar}
                iconColor={theme.colors.primary}
            />

            {allTags.length > 0 && (
                <View style={s.tagsFilterContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <Chip
                            selected={selectedTag === null}
                            onPress={() => setSelectedTag(null)}
                            style={s.filterChip}
                            selectedColor={theme.colors.primary}
                        >
                            Всі теги
                        </Chip>
                        {allTags.map(tag => (
                            <Chip
                                key={tag}
                                selected={selectedTag === tag}
                                onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                style={s.filterChip}
                                selectedColor={theme.colors.primary}
                            >
                                {tag}
                            </Chip>
                        ))}
                    </ScrollView>
                </View>
            )}

            <FlatList
                data={filteredStudents}
                renderItem={renderStudentCard}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={s.listContent}
                ListEmptyComponent={() => (
                    <View style={s.emptyContainer}>
                        <MaterialCommunityIcons
                            name="account-off"
                            size={64}
                            color={theme.colors.outline}
                        />
                        <Text variant="titleMedium" style={s.emptyText}>
                            Студентів не знайдено
                        </Text>
                        <Text variant="bodyMedium" style={s.emptySubtext}>
                            {searchQuery || selectedTag
                                ? 'Спробуйте змінити параметри пошуку'
                                : 'У вас поки немає студентів'}
                        </Text>
                    </View>
                )}
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
    searchbar: {
        marginHorizontal: theme.scale(16),
        marginVertical: theme.scale(8),
        backgroundColor: theme.colors.surface,
        elevation: 2,
    },
    tagsFilterContainer: {
        paddingHorizontal: theme.scale(16),
        marginBottom: theme.scale(8),
    },
    filterChip: {
        marginRight: theme.scale(8),
    },
    listContent: {
        padding: theme.scale(16),
    },
    studentCard: {
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
    studentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statusChip: {
        borderWidth: 0,
    },
    sessionInfo: {
        marginBottom: theme.scale(12),
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: theme.scale(4),
    },
    infoLabel: {
        width: 120,
        color: theme.colors.ezGrayDark,
    },
    notesContainer: {
        marginBottom: theme.scale(12),
        padding: theme.scale(8),
        backgroundColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(8),
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: theme.scale(12),
    },
    tag: {
        marginRight: theme.scale(8),
        marginBottom: theme.scale(8),
        backgroundColor: theme.colors.ezGrayBackground,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    actionButton: {
        marginRight: theme.scale(8),
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