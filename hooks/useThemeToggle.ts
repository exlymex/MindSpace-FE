import {toggleThemeState} from '@/store/slices';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {darkTheme, lightTheme} from '@/theme';

export const useThemeToggle = () => {
    const isDarkTheme = useAppSelector(state => state.theme.isDarkTheme);
    const dispatch = useAppDispatch();

    const theme = isDarkTheme ? darkTheme : lightTheme;

    const toggleTheme = () => {
        dispatch(toggleThemeState());
    };

    return {theme, toggleTheme};
};
