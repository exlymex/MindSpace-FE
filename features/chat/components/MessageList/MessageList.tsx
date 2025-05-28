import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useAppSelector} from '@/store/store';
import {Message} from '../Message/Message';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {useGetChatMessagesQuery} from '@/features/chat/api/chatApi';

export const MessageList: FC = () => {
    const {s} = useStyles(styles);
    const messages = useAppSelector((state) => state.chat.messages);
    const currentChatId = useAppSelector((state) => state.chat.currentChatId);
    const [refreshing, setRefreshing] = useState(false);
    console.log(messages)
    // Використовуємо RTK Query для отримання повідомлень
    const {refetch} = useGetChatMessagesQuery(currentChatId || 0, {
        // Пропускаємо запит, якщо немає активного чату
        skip: !currentChatId
    });

    const onRefresh = useCallback(async () => {
        if (!currentChatId) return;
        
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [currentChatId, refetch]);

    return (
        <FlatList
            style={s.messageList}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Message message={item}/>}
        
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            contentContainerStyle={s.messageListContent}
        />
    );
}; 