export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'psychologist';
  timestamp: number;
}

export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Доброго дня! Як я можу вам допомогти?',
    sender: 'psychologist',
    timestamp: Date.now() - 3600000, // 1 hour ago
  },
  {
    id: '2',
    text: 'Привіт! Мені потрібна консультація.',
    sender: 'user',
    timestamp: Date.now() - 3500000,
  },
  {
    id: '3',
    text: 'Звичайно, розкажіть що вас турбує?',
    sender: 'psychologist',
    timestamp: Date.now() - 3400000,
  },
]; 