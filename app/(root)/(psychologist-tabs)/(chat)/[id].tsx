import React, {useEffect, useMemo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {MessageInput, MessageList} from '@/features/chat/components';
import {useStyles} from '@/hooks';
import {setConnectionStatus, setCurrentChatId, setMessages,} from '@/store/slices/chatSlice';
import {useAppSelector} from '@/store/store';
import {styles} from '@/features/chat/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomText} from '@/components';
import Animated, {FadeIn} from 'react-native-reanimated';
import {useGetChatMessagesQuery, useGetUserChatsQuery} from '@/features/chat/api/chatApi';
import {useChatSocket} from '@/features/chat/hooks';
import {useLocalSearchParams} from 'expo-router';
import {IconButton} from 'react-native-paper';
import {router} from 'expo-router';

export default function PsychologistChatScreen() {
    const {s, theme} = useStyles(styles);
    const dispatch = useDispatch();
    const params = useLocalSearchParams<{ id: string }>();
    const chatId = parseInt(params.id || '0', 10);
    const user = useAppSelector((state) => state.auth.user);
    
    const {isConnected, sendMessage, sendTypingStatus, isTyping} = useChatSocket();

    const {data: chats = [], isLoading: isChatsLoading} = useGetUserChatsQuery();
    const {data: messages = [], isLoading: isMessagesLoading} = useGetChatMessagesQuery(chatId, {
        skip: !chatId
    });
    
    const currentChat = useMemo(() => {
        if (!chatId || !chats || chats.length === 0) return null;
        return chats.find(chat => chat.id === chatId);
    }, [chatId, chats]);
    
    const studentName = useMemo(() => {
        if (!currentChat || !currentChat.participant_info) return 'Студент';
        const { first_name, last_name } = currentChat.participant_info;
        return `${first_name} ${last_name}`;
    }, [currentChat]);

    useEffect(() => {
        if (chatId) {
            dispatch(setCurrentChatId(chatId));
        }
        
        return () => {
            dispatch(setCurrentChatId(0));
        };
    }, [chatId, dispatch]);

    useEffect(() => {
        if (messages && messages.length > 0) {
            dispatch(setMessages(messages));
        }
    }, [messages, dispatch]);

    useEffect(() => {
        dispatch(setConnectionStatus(true));
        
        return () => {
            dispatch(setConnectionStatus(false));
        };
    }, [dispatch]);

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

    return (
        <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
            <Animated.View
                entering={FadeIn.duration(500)}
                style={[s.header, {flexDirection: 'row', alignItems: 'center'}]}
            >
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => router.back()}
                    style={{marginRight: 8}}
                />
                <View style={{flex: 1}}>
                    <CustomText variant="ezH3Semi">
                        Чат з {studentName}
                    </CustomText>
                    {!isConnected && (
                        <CustomText
                            variant="ezSubtitleRegular"
                            style={s.connectionStatus}
                        >
                            Відключено від сервера
                        </CustomText>
                    )}
                </View>
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
                        {studentName} набирає повідомлення...
                    </CustomText>
                )}
                <MessageInput onSendMessage={sendMessage} onTypingStatus={sendTypingStatus}/>
            </View>
        </SafeAreaView>
    );
} 