import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from '@/features/auth/api/authApi';
import {themeReducer} from "@/store/slices/themeSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "@/store/slices/authSlice.ts";
import chatReducer from './slices/chatSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        theme: themeReducer,
        auth: authReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
    devTools: true,

});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;