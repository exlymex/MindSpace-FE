import { Stack, Redirect } from 'expo-router';
import { useAppSelector } from '@/store/store';

export default function AuthLayout() {
  const { accessToken } = useAppSelector(state => state.auth);

  // Якщо користувач авторизований, перенаправляємо з auth роутів
  if (accessToken) {
    return <Redirect href="/chat" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
} 