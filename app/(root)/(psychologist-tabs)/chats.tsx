import React, {useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Avatar, Badge, Button, Divider, Searchbar, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AppTheme} from '@/theme/theme';
import {router} from 'expo-router';
import {useStyles} from '@/hooks';
import {useCreateChatMutation, useGetUserChatsQuery} from '@/features/chat/api/chatApi';
import {useSearchUserByEmailQuery} from '@/features/auth/api/authApi';
import {useAppSelector} from '@/store/store';
import {API_BASE_URL} from '@/config/api';

interface ChatItem {
    id: number;
    name: string;
    lastMessage: string;
    time: string;
    unreadCount: number;
    avatar?: string | null;
    isOnline: boolean;
    student_id: number;
}

const formatChatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date >= today) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    } else if (date >= yesterday) {
        return 'Вчора';
    } else {
        return date.toLocaleDateString([], {day: '2-digit', month: '2-digit'});
    }
};

const getFullAvatarUrl = (avatarPath?: string | null): string | undefined => {
    if (!avatarPath) return undefined;

    if (avatarPath.startsWith('http')) {
        console.log('Avatar URL is already complete:', avatarPath);
        return avatarPath;
    }

    const cleanPath = avatarPath.startsWith('/') ? avatarPath.substring(1) : avatarPath;
    const fullUrl = `${API_BASE_URL}/${cleanPath}`;
    console.log('Constructed avatar URL:', fullUrl);
    return fullUrl;
};

export default function PsychologistChats() {
    const {s, theme} = useStyles(styles);
    const [searchQuery, setSearchQuery] = useState('');
    const currentUser = useAppSelector((state) => state.auth.user);
    const [modalVisible, setModalVisible] = useState(false);
    const [studentEmail, setStudentEmail] = useState('');
    const [studentId, setStudentId] = useState<number | null>(null);

    const {data: apiChats = [], isLoading, error, refetch} = useGetUserChatsQuery();

    const [createChat, {isLoading: isCreatingChat}] = useCreateChatMutation();

    const {data: foundStudent, isFetching: isSearchingStudent, error: searchError} = useSearchUserByEmailQuery(
        {email: studentEmail, role: 'student'},
        {skip: !studentEmail || studentEmail.length < 3}
    );

    useEffect(() => {
        if (foundStudent) {
            setStudentId(foundStudent.id);
        } else {
            setStudentId(null);
        }
    }, [foundStudent]);

    const chatItems = useMemo(() => {
        if (!apiChats || !apiChats.length) return [];

        return apiChats.map(chat => {
            const isStudent = chat.student_id === currentUser?.id;

            const participantInfo = chat.participant_info;

            const chatItem: ChatItem = {
                id: chat.id,
                name: participantInfo
                    ? `${participantInfo.first_name} ${participantInfo.last_name}`
                    : isStudent ? 'Психолог' : `Студент ${chat.student_id}`,
                lastMessage: 'Немає повідомлень',
                time: formatChatTime(chat.created_at),
                unreadCount: 0,
                avatar: participantInfo?.avatar_url || undefined,
                isOnline: false,
                student_id: chat.student_id
            };

            if (chat.last_message) {
                chatItem.lastMessage = chat.last_message.text;
                chatItem.time = formatChatTime(chat.last_message.created_at);
            }

            return chatItem;
        });
    }, [apiChats, currentUser]);

    // Фільтрація чатів за пошуком
    const filteredChats = useMemo(() => {
        return chatItems.filter(chat =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [chatItems, searchQuery]);

    // Функція для створення нового чату
    const handleCreateChat = async () => {
        if (!studentId) {
            Alert.alert('Помилка', 'Спочатку знайдіть студента');
            return;
        }

        if (!currentUser) {
            Alert.alert('Помилка', 'Ви не авторизовані');
            return;
        }

        try {
            const newChat = await createChat({
                student_id: studentId,
                psychologist_id: currentUser.id
            }).unwrap();

            // Закриваємо модальне вікно
            setModalVisible(false);

            // Очищаємо поля
            setStudentEmail('');
            setStudentId(null);

            // Оновлюємо список чатів
            refetch();

            // Переходимо до нового чату
            router.push({pathname: '/chat', params: {chatId: newChat.id, studentId: studentId}} as any);
        } catch (error) {
            console.error('Error creating chat:', error);
            Alert.alert('Помилка', 'Не вдалося створити чат');
        }
    };

    const renderChatItem = ({item}: { item: ChatItem }) => (
        <TouchableOpacity
            style={s.chatItem}
            onPress={() => router.push({
                pathname: '/chat',
                params: {chatId: item.id, studentId: item.student_id}
            } as any)}
        >
            <View style={s.avatarContainer}>
                {item.avatar ? (
                    <Avatar.Image
                        size={50}
                        source={{uri: getFullAvatarUrl(item.avatar)}}
                    />
                ) : (
                    <Avatar.Text
                        size={50}
                        label={item.name.split(' ').map(n => n[0]).join('')}
                        color="white"
                        style={{backgroundColor: theme.colors.primary}}
                    />
                )}
                {item.isOnline && (
                    <View style={s.onlineIndicator}/>
                )}
            </View>

            <View style={s.chatContent}>
                <View style={s.chatHeader}>
                    <Text variant="titleMedium" numberOfLines={1} style={s.chatName}>
                        {item.name}
                    </Text>
                    <Text variant="bodySmall" style={s.chatTime}>
                        {item.time}
                    </Text>
                </View>

                <View style={s.chatFooter}>
                    <Text
                        variant="bodyMedium"
                        numberOfLines={1}
                        style={[
                            s.lastMessage,
                            item.unreadCount > 0 && s.unreadMessage
                        ]}
                    >
                        {item.lastMessage}
                    </Text>

                    {item.unreadCount > 0 && (
                        <Badge style={s.badge}>
                            {item.unreadCount}
                        </Badge>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <Text variant="headlineMedium" style={s.headerTitle}>Чати</Text>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="filter-variant" size={24} color={theme.colors.primary}/>
                </TouchableOpacity>
            </View>

            <Searchbar
                placeholder="Пошук чатів"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={s.searchbar}
                iconColor={theme.colors.primary}
            />

            {isLoading ? (
                <View style={s.emptyContainer}>
                    <Text variant="titleMedium" style={s.emptyText}>
                        Завантаження чатів...
                    </Text>
                </View>
            ) : error ? (
                <View style={s.emptyContainer}>
                    <MaterialCommunityIcons
                        name="alert-circle-outline"
                        size={64}
                        color={theme.colors.error}
                    />
                    <Text variant="titleMedium" style={s.emptyText}>
                        Помилка завантаження чатів
                    </Text>
                    <Text variant="bodyMedium" style={s.emptySubtext}>
                        Спробуйте оновити сторінку
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredChats}
                    renderItem={renderChatItem}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={() => <Divider style={s.divider}/>}
                    contentContainerStyle={s.listContent}
                    ListEmptyComponent={() => (
                        <View style={s.emptyContainer}>
                            <MaterialCommunityIcons
                                name="chat-remove"
                                size={64}
                                color={theme.colors.outline}
                            />
                            <Text variant="titleMedium" style={s.emptyText}>
                                Чатів не знайдено
                            </Text>
                            <Text variant="bodyMedium" style={s.emptySubtext}>
                                {searchQuery
                                    ? 'Спробуйте змінити параметри пошуку'
                                    : 'У вас поки немає активних чатів'}
                            </Text>
                        </View>
                    )}
                />
            )}

            <TouchableOpacity
                style={s.fab}
                onPress={() => setModalVisible(true)}
            >
                <MaterialCommunityIcons name="message-plus" size={24} color="white"/>
            </TouchableOpacity>

            {/* Модальне вікно для створення нового чату */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={s.modalContainer}>
                    <View style={s.modalContent}>
                        <Text variant="headlineSmall" style={s.modalTitle}>
                            Новий чат
                        </Text>

                        <TextInput
                            label="Email студента"
                            value={studentEmail}
                            onChangeText={setStudentEmail}
                            style={s.input}
                            mode="outlined"
                            error={!!searchError}
                        />

                        {searchError && (
                            <Text style={s.errorText}>
                                Студента з таким email не знайдено
                            </Text>
                        )}

                        {foundStudent && (
                            <View style={s.studentInfo}>
                                <Text variant="bodyMedium" style={s.successText}>
                                    Студента знайдено!
                                </Text>
                                <Text variant="bodyMedium">
                                    {foundStudent.first_name} {foundStudent.last_name}
                                </Text>
                            </View>
                        )}

                        <View style={s.modalButtons}>
                            <Button
                                mode="outlined"
                                onPress={() => {
                                    setModalVisible(false);
                                    setStudentEmail('');
                                    setStudentId(null);
                                }}
                                style={s.modalButton}
                            >
                                Скасувати
                            </Button>

                            <Button
                                mode="contained"
                                onPress={handleCreateChat}
                                loading={isCreatingChat}
                                disabled={isCreatingChat || !studentId}
                                style={s.modalButton}
                            >
                                Створити чат
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

// Оновлюємо стилі для модального вікна
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
    listContent: {
        paddingBottom: theme.scale(80),
    },
    chatItem: {
        flexDirection: 'row',
        padding: theme.scale(16),
    },
    avatarContainer: {
        position: 'relative',
        marginRight: theme.scale(16),
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.ezGreen,
        borderWidth: 2,
        borderColor: theme.colors.background,
    },
    chatContent: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.scale(4),
    },
    chatName: {
        flex: 1,
        marginRight: theme.scale(8),
        color: theme.colors.ezBlack,
    },
    chatTime: {
        color: theme.colors.ezGrayDark,
    },
    chatFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        color: theme.colors.ezGrayDark,
        marginRight: theme.scale(8),
    },
    unreadMessage: {
        color: theme.colors.ezBlack,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: theme.colors.ezPrimary,
    },
    divider: {
        marginLeft: 70,
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
    fab: {
        position: 'absolute',
        right: theme.scale(16),
        bottom: theme.scale(16),
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.ezPrimary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.scale(8),
        padding: theme.scale(16),
        elevation: 5,
    },
    modalTitle: {
        marginBottom: theme.scale(16),
        color: theme.colors.ezPrimary,
        textAlign: 'center',
    },
    input: {
        marginBottom: theme.scale(16),
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        marginHorizontal: theme.scale(4),
    },
    successText: {
        color: theme.colors.ezGreen,
        fontWeight: 'bold',
    },
    errorText: {
        color: theme.colors.error,
        marginBottom: theme.scale(16),
    },
    studentInfo: {
        marginBottom: theme.scale(16),
        padding: theme.scale(8),
        backgroundColor: theme.colors.ezGrayBackground,
        borderRadius: theme.scale(4),
    },
}); 