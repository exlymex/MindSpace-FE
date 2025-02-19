import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthUser } from '../types';

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
    baseUrl: 'http://localhost:8000/api/v1/auth/',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signUp: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: 'register',
        method: 'POST',
        body: userData,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = authApi; 