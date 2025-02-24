import {mockMessages} from '@/features/chat/mockData';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'psychologist';
    timestamp: number;
}

interface ChatState {
    messages: Message[];
    isConnected: boolean;
    isTyping: boolean;
}

const initialState: ChatState = {
    messages: mockMessages,
    isConnected: false,
    isTyping: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setConnectionStatus: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
        setTypingStatus: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload;
        },
    },
});

export const {setMessages, addMessage, setConnectionStatus, setTypingStatus} = chatSlice.actions;
export default chatSlice.reducer; 