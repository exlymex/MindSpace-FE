import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {CustomText} from '@/components';
import {useRouter} from 'expo-router';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {addMessage, Message, setCurrentChatId, setMessages} from '@/store/slices/chatSlice';
import {useCreateChatMutation, useGetPsychologistsQuery, useGetUserChatsQuery} from '@/features/chat/api/chatApi';
import {useState} from 'react';

export function QuickActions() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {s} = useStyles(styles);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const user = useAppSelector((state) => state.auth.user);

    // Отримуємо дані з API
    const {data: chats = [], isLoading: isChatsLoading} = useGetUserChatsQuery(undefined);
    const {data: psychologists = []} = useGetPsychologistsQuery(undefined);
    const [createChat] = useCreateChatMutation();

    const handleChatPress = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setIsCreatingChat(true);

        try {
            // Якщо у користувача є чати, просто переходимо на екран чату
            if (chats && chats.length > 0) {
                router.push('/chat');
                return;
            }

            // Якщо чатів немає, створюємо новий чат з психологом
            if (!psychologists || psychologists.length === 0) {
                // Якщо не вдалося знайти психолога, все одно переходимо на екран чату,
                // де користувач побачить повідомлення про відсутність чатів і кнопку для створення
                router.push('/chat');
                return;
            }

            // Беремо першого доступного психолога
            const psychologist = psychologists[0];

            // Створюємо новий чат
            const newChat = await createChat({
                student_id: user.id,
                psychologist_id: psychologist.id
            }).unwrap();

            if (newChat) {
                // Встановлюємо ID нового чату як поточний
                dispatch(setCurrentChatId(newChat.id));

                // Очищаємо повідомлення, оскільки це новий чат
                dispatch(setMessages([]));

                // Додаємо привітальне повідомлення від психолога
                const welcomeMessage: Message = {
                    id: Date.now().toString(),
                    text: `Вітаю! Я ${psychologist.first_name} ${psychologist.last_name}, ваш особистий психолог. Чим я можу вам допомогти сьогодні?`,
                    sender: 'psychologist',
                    timestamp: Date.now()
                };

                dispatch(addMessage(welcomeMessage));
            }

            // В будь-якому випадку переходимо на екран чату
            router.push('/chat');
        } catch (error) {
            console.error('Error handling chat:', error);
            // Якщо сталася помилка, все одно переходимо на екран чату
            router.push('/chat');
        } finally {
            setIsCreatingChat(false);
        }
    };

    return (
        <View style={s.container}>
            <CustomText variant="ezH3Semi" style={s.title}>
                Швидкі дії
            </CustomText>
            <View style={s.buttonsContainer}>
                <Button
                    mode="contained"
                    onPress={() => router.push('/sessions')}
                    style={s.button}
                >
                    Забронювати сесію
                </Button>
                <Button
                    mode="contained"
                    onPress={handleChatPress}
                    loading={isChatsLoading || isCreatingChat}
                    disabled={isChatsLoading || isCreatingChat}
                    style={s.button}
                >
                    Написати психологу
                </Button>
                <Button
                    mode="contained"
                    onPress={() => router.push('/materials')}
                    style={s.button}
                >
                    Переглянути матеріали
                </Button>
            </View>
        </View>
    );
} 