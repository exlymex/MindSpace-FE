import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginRequestData, RegisterRequestData, User, UserUpdate} from '../types';
import {RootState} from '@/store/store';

// Визначте AuthResponse локально, якщо він використовується тільки тут
interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://localhost:8000/api/v1`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        signIn: builder.mutation<AuthResponse, LoginRequestData>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation<AuthResponse, RegisterRequestData>({
            query: (userData) => {
                const formattedData = {...userData};

                if (formattedData.birth_date instanceof Date) {
                    const year = formattedData.birth_date.getFullYear();
                    const month = String(formattedData.birth_date.getMonth() + 1).padStart(2, '0');
                    const day = String(formattedData.birth_date.getDate()).padStart(2, '0');
                    formattedData.birth_date = `${year}-${month}-${day}`;
                }

                return {
                    url: '/auth/register',
                    method: 'POST',
                    body: formattedData,
                };
            },
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => '/users/me',
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<User, UserUpdate>({
            query: (userData) => ({
                url: '/users/me',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetCurrentUserQuery,
    useUpdateUserMutation,
} = authApi; 