import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '@/store/store';
import { Redirect } from 'expo-router';
import { AppTheme } from '@/theme/theme';

export default function PsychologistTabsLayout() {
  const theme = useTheme<AppTheme>();
  const { accessToken, user } = useAppSelector(state => state.auth);

  // Захист роутів та перевірка ролі
  if (!accessToken) {
    return <Redirect href="/login" />;
  }

  // Перенаправлення студентів на їх інтерфейс
  if (user?.role !== 'psychologist') {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.ezPrimary,
        tabBarInactiveTintColor: theme.colors.ezGrayDark,
        tabBarStyle: { 
          paddingBottom: 5,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.ezGrayBackground,
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Дашборд',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Чати',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sessions"
        options={{
          title: 'Сесії',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="students"
        options={{
          title: 'Студенти',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профіль',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Налаштування',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
          href: null, // Приховуємо з таб-бару, доступ через профіль
        }}
      />
    </Tabs>
  );
} 