import React, {FC, useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Alert} from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import {useStyles} from '@/hooks';
import {styles} from './styles';
import {useAppSelector} from '@/store/store';

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onTypingStatus: (isTyping: boolean) => void;
}

export const MessageInput: FC<MessageInputProps> = ({onSendMessage, onTypingStatus}) => {
  const {s, theme} = useStyles(styles);
  const [message, setMessage] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const currentChatId = useAppSelector((state) => state.chat.currentChatId);
  const isConnected = useAppSelector((state) => state.chat.isConnected);

  // Відправляємо статус набору тексту
  useEffect(() => {
    if (!message.trim()) return;

    // Відправляємо статус, що користувач набирає текст
    try {
      onTypingStatus(true);
    } catch (error) {
      console.error('Error sending typing status:', error);
    }

    // Очищаємо попередній таймаут, якщо він є
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Встановлюємо новий таймаут для скидання статусу набору тексту
    const timeout = setTimeout(() => {
      try {
        onTypingStatus(false);
      } catch (error) {
        console.error('Error resetting typing status:', error);
      }
    }, 3000);

    setTypingTimeout(timeout);

    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [message, onTypingStatus]);

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }
    
    if (!currentChatId) {
      Alert.alert('Помилка', 'Немає активного чату');
      return;
    }
    
    try {
      onSendMessage(message);
      setMessage('');
      
      // Скидаємо статус набору тексту
      onTypingStatus(false);
      if (typingTimeout) {
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Помилка', 'Не вдалося відправити повідомлення');
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
        editable={!!currentChatId}
      />
      <TouchableOpacity 
        style={[s.sendButton, (!message.trim() || !currentChatId) && s.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!message.trim() || !currentChatId}
      >
        <Icon 
          name="send" 
          size={theme.scale(24)} 
          color={message.trim() && currentChatId ? theme.colors.ezPrimary : theme.colors.ezGrayMedium} 
        />
      </TouchableOpacity>
    </View>
  );
}; 