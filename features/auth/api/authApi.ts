import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {LoginRequestData, RegisterRequestData, User, UserUpdate} from '../types';
import {RootState} from '@/store/store';
import {API_ENDPOINTS} from '@/config/api';

// Визначте AuthResponse локально, якщо він використовується тільки тут
interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_ENDPOINTS.auth,
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
        getUserById: builder.query<User, number>({
            query: (userId) => `/users/${userId}`,
        }),
        getCurrentUser: builder.query<User, void>({
            query: () => '/users/me',
            providesTags: ['User'],
        }),

        searchUserByEmail: builder.query<User, { email: string, role?: string }>({
            query: ({email, role}) => {
                let url = `/users/search?email=${encodeURIComponent(email)}`;
                if (role) {
                    url += `&role=${encodeURIComponent(role)}`;
                }
                return url;
            },
        }),
        updateUser: builder.mutation<User, UserUpdate>({
            query: (userData) => ({
                url: '/users/me',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        updateAvatar: builder.mutation<User, FormData>({
            query: (formData) => ({
                url: '/users/me/avatar',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useSignInMutation,
    useSignUpMutation,
    useGetCurrentUserQuery,
    useSearchUserByEmailQuery,
    useUpdateUserMutation,
    useUpdateAvatarMutation,
} = authApi; 