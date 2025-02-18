import { io, Socket } from 'socket.io-client';
import { API_URL } from '@/config';
import { store } from '@/store/store';
import { Message, mockMessages } from './mockData';

class ChatAPI {
  private socket: Socket | null = null;
  private mockMessages = [...mockMessages];
  private mockTypingTimeout: NodeJS.Timeout | null = null;

  connect() {
    // Simulate socket connection
    setTimeout(() => {
      if (this.socket) {
        this.socket.emit('connect');
      }
    }, 1000);

    return {
      on: (event: string, callback: any) => {
        this.socket = { on: () => {}, emit: () => {} } as any;
        if (event === 'connect') {
          callback();
        }
      },
      emit: () => {}
    } as any;
  }

  disconnect() {
    this.socket = null;
  }

  sendMessage(text: string) {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: Date.now(),
    };
    
    this.mockMessages.push(newMessage);
    setTimeout(() => {
      this.socket?.on('message', newMessage);
    }, 100);

    // Simulate psychologist response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Дякую за ваше повідомлення. Я розумію вашу ситуацію.',
        sender: 'psychologist',
        timestamp: Date.now(),
      };
      this.mockMessages.push(response);
      this.socket?.on('message', response);
    }, 3000);
  }

  subscribeToMessages(callback: (message: Message) => void) {
    if (this.socket) {
      this.socket.on = ((_: string, cb: (msg: Message) => void) => {
        callback = cb;
      }) as any;
    }
  }

  subscribeToTyping(callback: (isTyping: boolean) => void) {
    if (this.socket) {
      this.socket.on = ((_: string, cb: (typing: boolean) => void) => {
        callback = cb;
      }) as any;
    }
  }

  async loadOlderMessages(beforeTimestamp: number = Date.now()) {
    return new Promise<Message[]>((resolve) => {
      setTimeout(() => {
        const messages = this.mockMessages.filter(msg => msg.timestamp < beforeTimestamp);
        resolve(messages);
      }, 500);
    });
  }

  sendTypingStatus(isTyping: boolean) {
    if (this.mockTypingTimeout) {
      clearTimeout(this.mockTypingTimeout);
    }

    if (isTyping) {
      this.mockTypingTimeout = setTimeout(() => {
        this.socket?.on('typing', false);
      }, 3000);
    }
  }
}

export const chatAPI = new ChatAPI(); 