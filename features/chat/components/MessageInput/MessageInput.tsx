import React, {FC, useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {chatAPI} from '../../api';

export const MessageInput: FC = () => {
  const {s, theme} = useStyles(styles);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      chatAPI.sendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={s.inputContainer}>
      <TextInput
        style={s.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Введіть повідомлення..."
        placeholderTextColor={theme.colors.ezGrayDark}
        multiline
        maxLength={1000}
      />
      <TouchableOpacity 
        style={[s.sendButton, !message.trim() && s.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Icon 
          name="send" 
          size={theme.scale(24)} 
          color={message.trim() ? theme.colors.ezPrimary : theme.colors.ezGrayMedium} 
        />
      </TouchableOpacity>
    </View>
  );
}; 