import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAction} from '@reduxjs/toolkit';

export interface Message {
    id: string;
    text: string;
    sender_id: number;
    timestamp: number;
    status?: string;
}

interface ChatState {
    messages: Message[];
    isConnected: boolean;
    isTyping: boolean;
    currentChatId: number | null;
}


const initialState: ChatState = {
    messages: [],
    isConnected: false,
    isTyping: false,
    currentChatId: null,
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
        setCurrentChatId: (state, action: PayloadAction<number>) => {
            state.currentChatId = action.payload;
        }
    },
});

export const {
    setMessages, 
    addMessage, 
    setConnectionStatus, 
    setTypingStatus,
    setCurrentChatId
} = chatSlice.actions;


export default chatSlice.reducer; 