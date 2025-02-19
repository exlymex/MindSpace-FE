import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { initializeAuth } from '@/store/slices/authSlice';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { useThemeToggle } from '@/hooks';

export default function GlobalRoot() {
  const dispatch = useAppDispatch();
  const { isFirstLoading } = useAppSelector(state => state.auth);
  const { theme } = useThemeToggle();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (isFirstLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}