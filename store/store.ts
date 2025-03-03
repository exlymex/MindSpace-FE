import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {authApi} from '@/features/auth/api/authApi';
import {themeReducer} from "@/store/slices/themeSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./slices/authSlice.ts";
import chatReducer from './slices/chatSlice';
import { notificationsReducer } from './slices/notificationsSlice';
import { sessionsApi } from '@/features/sessions/api';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [sessionsApi.reducerPath]: sessionsApi.reducer,
        theme: themeReducer,
        auth: authReducer,
        chat: chatReducer,
        notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, sessionsApi.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;