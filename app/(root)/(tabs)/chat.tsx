import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {MessageInput, MessageList} from '@/features/chat/components';
import {useStyles} from '@/hooks';
import {setConnectionStatus, setCurrentChatId, setMessages,} from '@/store/slices/chatSlice';
import {useAppSelector} from '@/store/store';
import {styles} from '@/features/chat/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomText} from '@/components';
import Animated, {FadeIn} from 'react-native-reanimated';
import {Button} from 'react-native-paper';
import {
    useCreateChatMutation,
    useGetChatMessagesQuery,
    useGetPsychologistsQuery,
    useGetUserChatsQuery
} from '@/features/chat/api/chatApi';
import {useChatSocket} from '@/features/chat/hooks';


export default function ChatScreen() {
    const {s, theme} = useStyles(styles);
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const currentChatId = useAppSelector((state) => state.chat.currentChatId);
    const [creatingChat, setCreatingChat] = useState(false);

    // Використовуємо наш новий хук для роботи з сокетами
    const {isConnected, sendMessage, sendTypingStatus, isTyping} = useChatSocket();

    const {data: chats = [], isLoading: isChatsLoading} = useGetUserChatsQuery();
    const {data: messages = [], isLoading: isMessagesLoading, refetch} = useGetChatMessagesQuery(currentChatId || 0, {
        // Пропускаємо запит, якщо немає активного чату
        skip: !currentChatId
    });
    const [createChat] = useCreateChatMutation();
    const {data: psychologists = []} = useGetPsychologistsQuery();
    // Встановлюємо поточний чат, якщо він ще не встановлений
    useEffect(() => {
        if (!currentChatId && chats && chats.length > 0) {
            dispatch(setCurrentChatId(chats[0].id));

        }
    }, [chats, currentChatId, dispatch]);

    // Встановлюємо повідомлення, коли вони завантажуються
    useEffect(() => {
        if (messages && messages.length > 0) {
            dispatch(setMessages(messages));
        }
    }, [messages, dispatch]);

    // Додаємо ефект для встановлення статусу підключення при монтуванні компонента
    useEffect(() => {
        // Встановлюємо статус підключення як true, щоб дозволити введення повідомлень
        // навіть якщо сокет ще не підключений
        dispatch(setConnectionStatus(true));

        // Очищаємо при розмонтуванні
        return () => {
            dispatch(setConnectionStatus(false));
        };
    }, [dispatch]);

    const handleCreateChat = async () => {
        if (!user || !psychologists || psychologists.length === 0) {
            Alert.alert('Помилка', 'Не вдалося знайти доступного психолога. Спробуйте пізніше.');
            return;
        }

        setCreatingChat(true);
        try {
            // Беремо першого доступного психолога
            const psychologist = psychologists[0];

            // Створюємо новий чат з психологом
            const newChat = await createChat({
                student_id: user.id,
                psychologist_id: psychologist.id
            }).unwrap();

            if (newChat) {
                // Встановлюємо ID нового чату як поточний
                dispatch(setCurrentChatId(newChat.id));

                // Очищаємо повідомлення, оскільки це новий чат
                dispatch(setMessages([]));

            } else {
                Alert.alert('Помилка', 'Не вдалося створити чат. Спробуйте пізніше.');
            }
        } catch (error) {
            console.error('Error creating chat:', error);
            Alert.alert('Помилка', 'Сталася помилка при створенні чату. Спробуйте пізніше.');
        } finally {
            setCreatingChat(false);
        }
    };

    // Показуємо індикатор завантаження, поки завантажуються чати
    if (isChatsLoading) {
        return (
            <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size="large" color={theme.colors.ezPrimary}/>
                    <CustomText variant="ezSubtitleRegular" style={{marginTop: 16}}>
                        Завантаження чату...
                    </CustomText>
                </View>
            </SafeAreaView>
        );
    }

    // Якщо у користувача немає активних чатів, показуємо кнопку для створення нового чату
    if (!currentChatId && (!chats || chats.length === 0)) {
        return (
            <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <CustomText variant="ezH3Semi" style={{marginBottom: 20, textAlign: 'center'}}>
                        У вас ще немає активних чатів з психологом
                    </CustomText>
                    <CustomText variant="ezSubtitleRegular" style={{marginBottom: 30, textAlign: 'center'}}>
                        Натисніть кнопку нижче, щоб почати спілкування з психологом
                    </CustomText>
                    <Button
                        mode="contained"
                        onPress={handleCreateChat}
                        loading={creatingChat}
                        disabled={creatingChat}
                        style={{width: '100%'}}
                    >
                        Почати чат з психологом
                    </Button>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
            <Animated.View
                entering={FadeIn.duration(500)}
                style={s.header}
            >
                <CustomText variant="ezH3Semi">

                    Чат з психологом
                </CustomText>
                {!isConnected && (
                    <CustomText
                        variant="ezSubtitleRegular"
                        style={s.connectionStatus}
                    >
                        Відключено від сервера
                    </CustomText>
                )}
            </Animated.View>

            <View style={s.chatContainer}>
                {isMessagesLoading ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size="large" color={theme.colors.ezPrimary}/>
                    </View>
                ) : (
                    <MessageList/>
                )}
                {isTyping && (
                    <CustomText
                        variant="ezSubtitleRegular"
                        style={s.typingIndicator}
                    >
                        Психолог набирає повідомлення...
                    </CustomText>
                )}
                <MessageInput onSendMessage={sendMessage} onTypingStatus={sendTypingStatus}/>
            </View>
        </SafeAreaView>
    );
}