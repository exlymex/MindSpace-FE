import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';
import { Material, Category } from './types';

export const materialsApi = createApi({
  reducerPath: 'materialsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/materials',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMaterials: builder.query<Material[], string | null>({
      query: (categoryId) => categoryId ? `/?category_id=${categoryId}` : '/',
      transformResponse: (response: any[]) => {
        if (!response) return [];
        
        return response.map(material => ({
          id: String(material.id),
          title: material.title,
          content: material.content,
          type: material.type,
          imageUrl: material.image_url,
          categories: material.categories.map((cat: any) => ({
            id: String(cat.id),
            name: cat.name,
            description: cat.description
          }))
        }));
      }
    }),
    getMaterialById: builder.query<Material, string>({
      query: (id) => `/${id}`,
      transformResponse: (response: any) => ({
        id: String(response.id),
        title: response.title,
        content: response.content,
        type: response.type,
        imageUrl: response.image_url,
        categories: response.categories.map((cat: any) => ({
          id: String(cat.id),
          name: cat.name,
          description: cat.description
        }))
      })
    }),
    getCategories: builder.query<Category[], void>({
      query: () => '/categories/',
      transformResponse: (response: any[]) => {
        if (!response) return [];
        
        return response.map(category => ({
          id: String(category.id),
          name: category.name,
          description: category.description
        }));
      }
    }),
  }),
});

export const { 
  useGetMaterialsQuery, 
  useGetMaterialByIdQuery, 
  useGetCategoriesQuery 
} = materialsApi; 