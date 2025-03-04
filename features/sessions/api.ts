import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Session, SessionCreate} from './types';
import {RootState} from '@/store/store';
import {API_ENDPOINTS} from '@/config/api';

export const sessionsApi = createApi({
    reducerPath: 'sessionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_ENDPOINTS.sessions,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Sessions'],
    endpoints: (builder) => ({
        getSessions: builder.query<Session[], void>({
            query: () => '/',
            providesTags: ['Sessions'],
            // Додаємо трансформацію відповіді для сумісності з фронтендом
            transformResponse: (response: any[]) => {
                if (!response) return [];

                return response.map(session => ({
                    id: String(session.id),
                    psychologistId: String(session.psychologist_id),
                    psychologistName: session.psychologist_name || "Невідомий психолог",
                    psychologistAvatar: session.psychologist_avatar || "",
                    date: session.date,
                    time: session.time,
                    duration: session.duration,
                    status: session.status,
                    notes: session.notes,
                    price: session.price
                }));
            }
        }),
        getSessionById: builder.query<Session, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{type: 'Sessions', id}],
        }),
        createSession: builder.mutation<Session, SessionCreate>({
            query: (sessionData) => ({
                url: '/',
                method: 'POST',
                body: sessionData,
            }),
            invalidatesTags: ['Sessions'],
        }),
        cancelSession: builder.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Sessions'],
        }),
        updateSession: builder.mutation<Session, { id: string; data: Partial<Session> }>({
            query: ({id, data}) => ({
                url: `/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, {id}) => [{type: 'Sessions', id}, 'Sessions'],
        }),
        bookSession: builder.mutation<Session, SessionCreate>({
            query: (sessionData) => ({
                url: '/',
                method: 'POST',
                body: sessionData,
            }),
            invalidatesTags: ['Sessions'],
        }),
    }),
});

export const {
    useGetSessionsQuery,
    useGetSessionByIdQuery,
    useCreateSessionMutation,
    useCancelSessionMutation,
    useUpdateSessionMutation,
    useBookSessionMutation,
} = sessionsApi; 