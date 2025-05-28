import {useCallback, useEffect, useRef} from 'react';
import {io, Socket} from 'socket.io-client';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {addMessage, Message, setConnectionStatus, setTypingStatus} from '@/store/slices/chatSlice';
import {API_URL} from "@/config/api.ts";

export const useChatSocket = (role?: 'student' | 'psychologist') => {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const user = useAppSelector((state) => state.auth.user);
    const {isTyping, isConnected, currentChatId} = useAppSelector((state) => state.chat);
    const socketRef = useRef<Socket | null>(null);
    
    // Визначаємо роль користувача
    const userRole = role || (user?.role === 'psychologist' ? 'psychologist' : 'student');

    // Функція для підключення до сокета
    const connectSocket = useCallback(() => {
        if (!accessToken) {
            console.error('No authentication token found');
            return null;
        }

        // Connect to the socket server with the token
        const socket = io(API_URL, {
            auth: {
                token: accessToken
            },
            path: "/socket.io",
            transports: ['websocket'],
            reconnection: true,
        });

        // Додаємо логування для відстеження подій сокета
        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        return socket;
    }, [accessToken]);

    // Connect to socket when we have a current chat ID and token
    useEffect(() => {
        if (!currentChatId || !accessToken) return;

        // Створюємо новий сокет
        socketRef.current = connectSocket();

        if (socketRef.current) {
            // Обробляємо підключення
            socketRef.current.on('connect', () => {
                console.log('Socket connected successfully');
                dispatch(setConnectionStatus(true));
            });

            // Обробляємо відключення
            socketRef.current.on('disconnect', () => {
                console.log('Socket disconnected');
                dispatch(setConnectionStatus(false));
            });

            // Підписуємося на нові повідомлення
            socketRef.current.on('new_message', (data) => {
                console.log('Received new message:', data);
                
                // Перевіряємо, що повідомлення належить до поточного чату
                if (data.chat_id === currentChatId) {
                    const message: Message = {
                        id: data.message_id.toString(),
                        text: data.text,
                        sender_id: data.sender_id,
                        timestamp: new Date(data.created_at).getTime()
                    };
                    dispatch(addMessage(message));
                }
            });

            // Підписуємося на підтвердження відправлення повідомлення
            socketRef.current.on('message_sent', (data) => {
                console.log('Message sent confirmation:', data);
            });

            // Підписуємося на статус набору тексту
            socketRef.current.on('typing', (data) => {
                // Перевіряємо, що статус набору належить до поточного чату
                if (data.chat_id === currentChatId) {
                    dispatch(setTypingStatus(data.is_typing));
                }
            });
        }

        // Очищаємо сокет при розмонтуванні компонента або зміні чату
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [dispatch, currentChatId, accessToken, user?.id, connectSocket]);

    // Функція для відправлення повідомлення
    const sendMessage = useCallback((text: string) => {
        if (!socketRef.current || !user?.id) {
            console.error('Socket not connected or user not found');
            return;
        }

        if (!currentChatId) {
            console.error('No active chat found');
            return;
        }

        console.log('Sending message:', {chat_id: currentChatId, text});

        // Створюємо тимчасовий ID для повідомлення
        const tempMessageId = `temp-${Date.now()}`;
        
        // Додаємо повідомлення до Redux одразу
        const message: Message = {
            id: tempMessageId,
            text: text,
            sender_id: user.id,
            timestamp: Date.now(),
            status: 'sending'
        };
        
        // Додаємо повідомлення до Redux
        dispatch(addMessage(message));

        // Відправляємо повідомлення через сокет
        socketRef.current.emit('send_message', {
            chat_id: currentChatId,
            text: text
        });
    }, [currentChatId, dispatch, user?.id]);

    // Функція для відправлення статусу набору тексту
    const sendTypingStatus = useCallback((isTyping: boolean) => {
        if (!socketRef.current) {
            console.error('Socket not connected');
            return;
        }

        if (!currentChatId) {
            console.error('No active chat found');
            return;
        }

        socketRef.current.emit('typing', {
            chat_id: currentChatId,
            is_typing: isTyping
        });
    }, [currentChatId]);

    return {
        isConnected,
        isTyping,
        sendMessage,
        sendTypingStatus,
        socketRef
    };
}; 