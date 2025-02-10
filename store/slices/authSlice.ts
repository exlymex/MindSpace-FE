import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthSliceState {
    accessToken: string | null;
    refreshToken: string | null;
    isActiveTeamDriver: boolean;
}

interface SetAuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthSliceState = {
    accessToken: null,
    refreshToken: null,
    isActiveTeamDriver: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload;
        },
        setAuthTokens: (state, action: PayloadAction<SetAuthTokens>) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setTeamDriverStatus: (state, action: PayloadAction<boolean>) => {
            state.isActiveTeamDriver = action.payload;
        },
        logoutUser: state => {
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const {logoutUser, setAccessToken, setAuthTokens, setTeamDriverStatus} = authSlice.actions;
export const authReducer = authSlice.reducer;
