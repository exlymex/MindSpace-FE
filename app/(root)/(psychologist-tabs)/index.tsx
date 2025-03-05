import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Switch, Button, Avatar, Badge, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '@/store/store';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';
import { useStyles } from '@/hooks';

export default function PsychologistDashboard() {
  const { s, theme } = useStyles(styles);
  const { user } = useAppSelector(state => state.auth);
  const [isOnline, setIsOnline] = useState(false);

  // Приклад даних для відображення
  const upcomingSessions = [
    { id: 1, studentName: 'Анна Коваленко', date: '2023-06-15', time: '14:00' },
    { id: 2, studentName: 'Іван Петренко', date: '2023-06-16', time: '10:30' },
  ];

  const recentChats = [
    { id: 1, studentName: 'Марія Шевченко', lastMessage: 'Дякую за консультацію!', unread: 2 },
    { id: 2, studentName: 'Олег Сидоренко', lastMessage: 'Коли ми можемо зустрітися?', unread: 0 },
    { id: 3, studentName: 'Наталія Мельник', lastMessage: 'Я хотіла б перенести нашу зустріч', unread: 1 },
  ];

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    // Тут буде логіка для оновлення статусу на сервері
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView>
        {/* Заголовок і статус */}
        <View style={s.header}>
          <View>
            <Text variant="headlineMedium" style={s.headerText}>
              Вітаємо, {user?.first_name}!
            </Text>
            <Text variant="bodyMedium">Ваш психологічний дашборд</Text>
          </View>
          <View style={s.statusContainer}>
            <Text variant="bodyMedium" style={{ marginRight: 8 }}>
              {isOnline ? 'Онлайн' : 'Офлайн'}
            </Text>
            <Switch
              value={isOnline}
              onValueChange={toggleOnlineStatus}
              color={theme.colors.primary}
            />
          </View>
        </View>

        {/* Статистика */}
        <View style={s.statsContainer}>
          <Card style={s.statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">12</Text>
              <Text variant="bodySmall">Активних студентів</Text>
            </Card.Content>
          </Card>
          
          <Card style={s.statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="calendar-check" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">5</Text>
              <Text variant="bodySmall">Сесій на тиждень</Text>
            </Card.Content>
          </Card>
          
          <Card style={s.statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="message-text" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">3</Text>
              <Text variant="bodySmall">Непрочитаних повідомлень</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Найближчі сесії */}
        <Card style={s.sectionCard}>
          <Card.Title 
            title="Найближчі сесії" 
            right={(props) => (
              <Button 
                mode="text" 
                onPress={() => router.push('/sessions' as any)}
              >
                Всі
              </Button>
            )}
          />
          <Card.Content>
            {upcomingSessions.map(session => (
              <View key={session.id} style={s.sessionItem}>
                <View style={s.sessionInfo}>
                  <Text variant="titleMedium">{session.studentName}</Text>
                  <Text variant="bodyMedium">{session.date}, {session.time}</Text>
                </View>
                <Button 
                  mode="contained" 
                  compact 
                  onPress={() => {/* Логіка для початку сесії */}}
                >
                  Деталі
                </Button>
              </View>
            ))}
            {upcomingSessions.length === 0 && (
              <Text variant="bodyMedium">Немає запланованих сесій</Text>
            )}
          </Card.Content>
        </Card>

        {/* Останні чати */}
        <Card style={s.sectionCard}>
          <Card.Title 
            title="Останні чати" 
            right={(props) => (
              <Button 
                mode="text" 
                onPress={() => router.push('/chats' as any)}
              >
                Всі
              </Button>
            )}
          />
          <Card.Content>
            {recentChats.map(chat => (
              <TouchableOpacity 
                key={chat.id} 
                style={s.chatItem}
                onPress={() => {/* Логіка для переходу до чату */}}
              >
                <View style={s.chatAvatar}>
                  <Avatar.Text 
                    size={40} 
                    label={chat.studentName.split(' ').map(n => n[0]).join('')} 
                    color="white"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  {chat.unread > 0 && (
                    <Badge style={s.badge}>{chat.unread}</Badge>
                  )}
                </View>
                <View style={s.chatInfo}>
                  <Text variant="titleMedium">{chat.studentName}</Text>
                  <Text 
                    variant="bodyMedium" 
                    numberOfLines={1} 
                    style={chat.unread > 0 ? s.unreadMessage : {}}
                  >
                    {chat.lastMessage}
                  </Text>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color={theme.colors.outline} 
                />
              </TouchableOpacity>
            ))}
          </Card.Content>
        </Card>

        {/* Швидкі дії */}
        <Card style={s.sectionCard}>
          <Card.Title title="Швидкі дії" />
          <Card.Content>
            <View style={s.actionsContainer}>
              <TouchableOpacity 
                style={s.actionButton}
                onPress={() => router.push('/students' as any)}
              >
                <MaterialCommunityIcons 
                  name="account-group" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text variant="bodyMedium">Студенти</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={s.actionButton}
                onPress={() => {/* Логіка для створення нової сесії */}}
              >
                <MaterialCommunityIcons 
                  name="calendar-plus" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text variant="bodyMedium">Нова сесія</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={s.actionButton}
                onPress={() => router.push('/profile' as any)}
              >
                <MaterialCommunityIcons 
                  name="account-cog" 
                  size={24} 
                  color={theme.colors.primary} 
                />
                <Text variant="bodyMedium">Профіль</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.scale(16),
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ezGrayBackground,
  },
  headerText: {
    color: theme.colors.ezPrimary,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.scale(16),
  },
  statCard: {
    width: '30%',
    padding: theme.scale(8),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.scale(12),
    elevation: 2,
    shadowColor: theme.colors.ezBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionCard: {
    marginHorizontal: theme.scale(16),
    marginBottom: theme.scale(16),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.scale(12),
    elevation: 2,
    shadowColor: theme.colors.ezBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.scale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ezGrayBackground,
  },
  sessionInfo: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.scale(12),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.ezGrayBackground,
  },
  chatAvatar: {
    position: 'relative',
    marginRight: theme.scale(12),
  },
  chatInfo: {
    flex: 1,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.ezRed,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.scale(8),
  },
  actionButton: {
    alignItems: 'center',
    padding: theme.scale(12),
    borderRadius: theme.scale(8),
    backgroundColor: theme.colors.ezGrayBackground,
  },
}); 