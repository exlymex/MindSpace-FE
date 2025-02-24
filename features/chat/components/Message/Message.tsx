import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {format} from 'date-fns';
import {uk} from 'date-fns/locale';
import {useStyles} from '@/hooks';
import {styles} from './styles';

interface MessageProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'psychologist';
    timestamp: number;
  };
}

export const Message: FC<MessageProps> = ({message}) => {
  const {s} = useStyles(styles);
  
  const isUser = message.sender === 'user';

  return (
    <View style={[s.messageContainer, isUser ? s.userMessage : s.psychologistMessage]}>
      <Text style={[s.messageText, isUser ? s.userMessageText : s.psychologistMessageText]}>
        {message.text}
      </Text>
      <Text style={s.timestamp}>
        {format(new Date(message.timestamp), 'HH:mm', {locale: uk})}
      </Text>
    </View>
  );
}; 