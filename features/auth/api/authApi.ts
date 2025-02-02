import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthUser } from '../types';

// Mock user database
const MOCK_USER: AuthUser = {
  id: '1',
  email: 'test@example.com',
  isAnonymous: false,
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthUser, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (email === MOCK_USER.email && password === 'password') {
          return { data: MOCK_USER };
        }
        
        return { 
          error: 'Invalid email or password' 
        };
      },
    }),
    signUp: builder.mutation<AuthUser, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock registration success
        return {
          data: {
            id: Math.random().toString(36).substr(2, 9),
            email,
            isAnonymous: false,
          }
        };
      },
    }),
    signUpAnonymously: builder.mutation<AuthUser, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          data: {
            id: Math.random().toString(36).substr(2, 9),
            isAnonymous: true,
          }
        };
      },
    }),
    signOut: builder.mutation<void, void>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { data: undefined };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useSignUpAnonymouslyMutation,
  useSignOutMutation,
} = authApi; 