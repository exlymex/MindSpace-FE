import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {MessageInput, MessageList} from '@/features/chat/components';
import {useStyles} from '@/hooks';
import {chatAPI} from '@/features/chat/api';
import {addMessage, setConnectionStatus, setTypingStatus} from '@/store/slices/chatSlice';
import {useAppSelector} from '@/store/store';
import {styles} from '@/features/chat/styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomText} from '@/components';
import Animated, {FadeIn} from 'react-native-reanimated';

export default function ChatScreen() {
    const {s} = useStyles(styles);
    const dispatch = useDispatch();
    const isConnected = useAppSelector((state) => state.chat.isConnected);
    const isTyping = useAppSelector((state) => state.chat.isTyping);

    useEffect(() => {
        const socket = chatAPI.connect();

        socket.on('connect', () => {
            dispatch(setConnectionStatus(true));
        });

        socket.on('disconnect', () => {
            dispatch(setConnectionStatus(false));
        });

        chatAPI.subscribeToMessages((message) => {
            dispatch(addMessage({
                ...message,
                sender: message.sender === 'user' ? 'user' : 'psychologist'
            }));
        });

        chatAPI.subscribeToTyping((typing) => {
            dispatch(setTypingStatus(typing));
        });

        return () => {
            chatAPI.disconnect();
        };
    }, [dispatch]);

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
                <MessageList/>
                {isTyping && (
                    <CustomText
                        variant="ezSubtitleRegular"
                        style={s.typingIndicator}
                    >
                        Психолог набирає повідомлення...
                    </CustomText>
                )}
                <MessageInput/>
            </View>
        </SafeAreaView>
    );
}