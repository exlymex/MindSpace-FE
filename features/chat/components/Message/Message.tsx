import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {useAppSelector} from '@/store/store';

interface MessageProps {
  message: {
    id: string;
    text: string;
    sender_id: number;
    timestamp: number;
  };
}

export const Message: FC<MessageProps> = ({message}) => {
  const {s} = useStyles(styles);
  const currentUser = useAppSelector((state) => state.auth.user);
  
  const isMyMessage = currentUser?.id === message.sender_id;

  return (
    <View style={[s.messageContainer, isMyMessage ? s.userMessage : s.otherUserMessage]}>
      <Text style={[s.messageText, isMyMessage ? s.userMessageText : s.otherUserMessageText]}>
        {message.text}
      </Text>
      <Text style={[s.timestamp, isMyMessage ? s.userTimestamp : s.otherUserTimestamp]}>
        {format(new Date(message.timestamp), 'HH:mm', {locale: uk})}
      </Text>
    </View>
  );
}; 