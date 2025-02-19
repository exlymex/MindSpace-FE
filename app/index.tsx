import { useAppSelector } from '@/store/store';
import { Redirect } from 'expo-router';

export default function Index() {
  const { accessToken } = useAppSelector(state => state.auth);

  if (accessToken) {
    return <Redirect href="/(root)/(tabs)/" />;
  }

  return <Redirect href="/login" />;
} 