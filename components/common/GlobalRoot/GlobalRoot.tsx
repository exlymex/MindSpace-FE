import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {initializeAuth} from '@/store/slices/authSlice';
import {Stack, useRouter, useSegments} from 'expo-router';
import {useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {useThemeToggle} from "@/hooks";

export default function GlobalRoot() {
    const colorScheme = useColorScheme();
    const dispatch = useAppDispatch();
    const {isFirstLoading, user, accessToken} = useAppSelector(state => state.auth);
    const router = useRouter();
    const segments = useSegments();
    const {theme} = useThemeToggle();
    useEffect(() => {
        dispatch(initializeAuth());
    }, [dispatch]);

    // Ефект для перенаправлення користувача на відповідний екран після ініціалізації
    useEffect(() => {
        if (isFirstLoading) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!accessToken && !inAuthGroup) {
            // Перенаправлення на логін, якщо користувач не авторизований
            router.replace('/login');
        } else if (accessToken && inAuthGroup) {
            // Перенаправлення на відповідний інтерфейс після авторизації
            if (user?.role === 'psychologist') {
                router.replace('/(root)/(psychologist-tabs)');
            } else {
                router.replace('/(root)/(tabs)');
            }
        }
    }, [isFirstLoading, accessToken, user, segments]);

    // Визначення теми залежно від ролі користувача

    if (isFirstLoading) {
        return null; // або показати екран завантаження
    }

    return (
        <PaperProvider theme={theme}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(auth)" options={{headerShown: false}}/>
                <Stack.Screen name="(root)" options={{headerShown: false}}/>
                <Stack.Screen name="modal" options={{presentation: 'modal'}}/>
            </Stack>
        </PaperProvider>
    );
}
