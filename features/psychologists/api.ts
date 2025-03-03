import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { Psychologist } from './types';

export const psychologistsApi = createApi({
  reducerPath: 'psychologistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/users',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPsychologists: builder.query<Psychologist[], void>({
      query: () => '/psychologists',
      transformResponse: (response: any[]) => {
        if (!response) return [];
        
        return response.map(user => ({
          id: String(user.id),
          username: user.username,
          avatar: user.avatar || "",
          specialization: user.specialization || "",
          experience: user.experience || 0,
          rating: user.rating || 0,
        }));
      }
    }),
  }),
});

export const { useGetPsychologistsQuery } = psychologistsApi; 