import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from '@/store/store';
import {PsychologistListItem} from './types';

export const psychologistsApi = createApi({
    reducerPath: 'psychologistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/v1/users',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPsychologists: builder.query<PsychologistListItem[], void>({
            query: () => '/psychologists',
            transformResponse: (response: any[]) => {
                if (!response) return [];

                return response.map(user => ({
                    id: String(user.id),
                    avatar: user.avatar_url || "",
                    fullName: `${user.first_name} ${user.last_name}`,
                    specialization: user.specialization || "",
                    experience: `${user.experience_years || 0} років`,
                    rating: 4.5,
                }));
            }
        }),
    }),
});

export const {useGetPsychologistsQuery} = psychologistsApi;