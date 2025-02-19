import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {MessageInput, MessageList} from '@/features/chat/components';
import {useStyles} from '@/hooks';
import {chatAPI} from '@/features/chat/api';
import {addMessage, setConnectionStatus, setTypingStatus} from '@/store/slices/chatSlice';
import {useAppSelector} from '@/store/store';
import {styles} from '@/features/chat/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomText } from '@/components';

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
            dispatch(addMessage(message));
        });

        chatAPI.subscribeToTyping((typing) => {
            dispatch(setTypingStatus(typing));
        });

        return () => {
            chatAPI.disconnect();
        };
    }, [dispatch]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <CustomText variant="ezH2Semi">Чат</CustomText>
            <SafeAreaView style={s.container}>
                {!isConnected && (
                    <View style={s.connectionStatus}>
                        <Text>Відключено від сервера</Text>
                    </View>
                )}
                <MessageList/>
                {isTyping && (
                    <Text style={s.typingIndicator}>
                        Психолог набирає повідомлення...
                    </Text>
                )}
                <MessageInput/>
            </SafeAreaView>
        </View>
    );
}