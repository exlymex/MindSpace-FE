import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkTheme: boolean;
}

const initialState: ThemeState = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleThemeState: state => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleThemeState } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
