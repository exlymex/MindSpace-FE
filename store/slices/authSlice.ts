import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {storage, StorageKeys} from '@/utils/storage';

interface AuthState {
    accessToken: string | null;
    isFirstLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isFirstLoading: true,
};

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async () => {
        const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
        return token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            if (action.payload) {
                storage.setItem(StorageKeys.ACCESS_TOKEN, action.payload);
            } else {
                storage.removeItem(StorageKeys.ACCESS_TOKEN);
            }
        },
        logout: (state) => {
            state.accessToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.isFirstLoading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.accessToken = action.payload;
                state.isFirstLoading = false;
            });
    },
});

export const {setAccessToken, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
