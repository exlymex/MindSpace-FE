import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {User, UserUpdate} from '../types';
import {RootState} from '@/store/store';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    role: 'student' | 'psychologist';
}

interface AuthResponse {
    access_token: string;
    // token: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1',
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
        signIn: builder.mutation<AuthResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signUp: builder.mutation<AuthResponse, RegisterRequest>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
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