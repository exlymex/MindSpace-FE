import React, {FC, useCallback, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useAppSelector} from '@/store/store';
import {Message} from '../Message/Message';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {chatAPI} from '../../api';

export const MessageList: FC = () => {
    const {s} = useStyles(styles);
    const messages = useAppSelector((state) => state.chat.messages);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await chatAPI.loadOlderMessages();
        } finally {
            setRefreshing(false);
        }
    }, []);

    return (
        <FlatList
            style={s.messageList}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Message message={item}/>}
            inverted
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
            contentContainerStyle={s.messageListContent}
        />
    );
}; 