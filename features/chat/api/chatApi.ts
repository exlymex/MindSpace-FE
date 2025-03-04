import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState, store} from '@/store/store';
import {API_BASE_URL} from '@/config/api';
import {Message} from '@/store/slices/chatSlice';
import {Chat, CreateChatRequest, MessageResponse, Psychologist} from "@/features/chat/types.ts";


export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Chats', 'Messages'],
    endpoints: (builder) => ({
        getUserChats: builder.query<Chat[], void>({
            query: () => '/api/v1/chats/',
            providesTags: ['Chats'],
        }),

        getChatMessages: builder.query<Message[], number>({
            query: (chatId) => `/api/v1/chats/${chatId}/messages`,
            providesTags: ['Messages'],
            transformResponse: (response: MessageResponse[]): Message[] => {
                const userId = (store.getState() as RootState).auth.user?.id;
                
                // Перевіряємо, що повідомлення належать до чату поточного користувача
                return response.map(msg => ({
                    id: msg.id.toString(),
                    text: msg.text,
                    sender: msg.sender_id === userId ? 'user' : 'psychologist',
                    timestamp: new Date(msg.created_at).getTime()
                }));
            },
        }),

        createChat: builder.mutation<Chat, CreateChatRequest>({
            query: (chatData) => ({
                url: '/api/v1/chats/',
                method: 'POST',
                body: chatData,
            }),
            invalidatesTags: ['Chats'],
        }),

        getPsychologists: builder.query<Psychologist[], void>({
            query: () => '/api/v1/users/psychologists',
        }),
    }),
});

export const {
    useGetUserChatsQuery,
    useGetChatMessagesQuery,
    useCreateChatMutation,
    useGetPsychologistsQuery,
} = chatApi; 