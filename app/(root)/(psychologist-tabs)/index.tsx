import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Switch, Button, Avatar, Badge, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector } from '@/store/store';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';

export default function PsychologistDashboard() {
  const theme = useTheme<AppTheme>();
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
    <SafeAreaView style={styles(theme).container}>
      <ScrollView>
        {/* Заголовок і статус */}
        <View style={styles(theme).header}>
          <View>
            <Text variant="headlineMedium" style={styles(theme).headerText}>
              Вітаємо, {user?.first_name}!
            </Text>
            <Text variant="bodyMedium">Ваш психологічний дашборд</Text>
          </View>
          <View style={styles(theme).statusContainer}>
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
        <View style={styles(theme).statsContainer}>
          <Card style={styles(theme).statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="account-group" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">12</Text>
              <Text variant="bodySmall">Активних студентів</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles(theme).statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="calendar-check" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">5</Text>
              <Text variant="bodySmall">Сесій на тиждень</Text>
            </Card.Content>
          </Card>
          
          <Card style={styles(theme).statCard}>
            <Card.Content>
              <MaterialCommunityIcons name="message-text" size={24} color={theme.colors.primary} />
              <Text variant="titleLarge">3</Text>
              <Text variant="bodySmall">Непрочитаних повідомлень</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Найближчі сесії */}
        <Card style={styles(theme).sectionCard}>
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
              <View key={session.id} style={styles(theme).sessionItem}>
                <View style={styles(theme).sessionInfo}>
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
        <Card style={styles(theme).sectionCard}>
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
                style={styles(theme).chatItem}
                onPress={() => {/* Логіка для переходу до чату */}}
              >
                <View style={styles(theme).chatAvatar}>
                  <Avatar.Text 
                    size={40} 
                    label={chat.studentName.split(' ').map(n => n[0]).join('')} 
                    color="white"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  {chat.unread > 0 && (
                    <Badge style={styles(theme).badge}>{chat.unread}</Badge>
                  )}
                </View>
                <View style={styles(theme).chatInfo}>
                  <Text variant="titleMedium">{chat.studentName}</Text>
                  <Text 
                    variant="bodyMedium" 
                    numberOfLines={1} 
                    style={chat.unread > 0 ? styles(theme).unreadMessage : {}}
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
        <Card style={styles(theme).sectionCard}>
          <Card.Title title="Швидкі дії" />
          <Card.Content>
            <View style={styles(theme).actionsContainer}>
              <TouchableOpacity 
                style={styles(theme).actionButton}
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
                style={styles(theme).actionButton}
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
                style={styles(theme).actionButton}
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

const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.primaryContainer,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  statCard: {
    width: '30%',
    padding: 8,
  },
  sectionCard: {
    margin: 16,
    marginTop: 0,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  sessionInfo: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceVariant,
  },
  chatAvatar: {
    position: 'relative',
    marginRight: 16,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.error,
  },
  chatInfo: {
    flex: 1,
  },
  unreadMessage: {
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
}); 