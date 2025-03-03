import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '@/features/auth/types';

interface AuthState {
    accessToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    isFirstLoading: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isFirstLoading: true,
};

export const initializeAuth = createAsyncThunk(
    'auth/initialize',
    async (_, {dispatch}) => {
        try {
            const token = await AsyncStorage.getItem('token');

            if (!token) {
                return null;
            }

            dispatch(setAccessToken(token));

            try {
                const response = await fetch('http://localhost:8000/api/v1/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const userData = await response.json();
                    dispatch(setUser(userData));
                    return token;
                } else {
                    await AsyncStorage.removeItem('token');
                    return null;
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                return token;
            }
        } catch (error) {
            console.error('Failed to initialize auth:', error);
            return null;
        }
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;

            if (action.payload) {
                AsyncStorage.setItem('token', action.payload);
            } else {
                AsyncStorage.removeItem('token');
                state.user = null;
            }
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
            AsyncStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeAuth.pending, (state) => {
                state.isFirstLoading = true;
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isFirstLoading = false;
            })
            .addCase(initializeAuth.rejected, (state) => {
                state.isFirstLoading = false;
                state.accessToken = null;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const {setAccessToken, setUser, logout} = authSlice.actions;

export const authReducer = authSlice.reducer;
