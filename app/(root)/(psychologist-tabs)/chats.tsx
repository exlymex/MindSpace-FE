import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Avatar, Badge, Divider, useTheme, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';

interface ChatItem {
  id: number;
  studentName: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

export default function PsychologistChats() {
  const theme = useTheme<AppTheme>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'active'>('all');

  // Приклад даних для відображення
  const chats: ChatItem[] = [
    { 
      id: 1, 
      studentName: 'Марія Шевченко', 
      lastMessage: 'Дякую за консультацію! Це дуже допомогло мені розібратися з моїми проблемами.', 
      timestamp: '10:30', 
      unread: 2,
      isOnline: true
    },
    { 
      id: 2, 
      studentName: 'Олег Сидоренко', 
      lastMessage: 'Коли ми можемо зустрітися для відеосесії?', 
      timestamp: 'Вчора', 
      unread: 0,
      isOnline: false
    },
    { 
      id: 3, 
      studentName: 'Наталія Мельник', 
      lastMessage: 'Я хотіла б перенести нашу зустріч на інший час, якщо це можливо.', 
      timestamp: 'Вчора', 
      unread: 1,
      isOnline: true
    },
    { 
      id: 4, 
      studentName: 'Іван Петренко', 
      lastMessage: 'Дякую за вашу пораду, я спробую застосувати ці техніки.', 
      timestamp: '23 Тра', 
      unread: 0,
      isOnline: false
    },
    { 
      id: 5, 
      studentName: 'Анна Коваленко', 
      lastMessage: 'Чи можемо ми обговорити результати останнього тесту?', 
      timestamp: '20 Тра', 
      unread: 0,
      isOnline: false
    },
  ];

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'unread') {
      return matchesSearch && chat.unread > 0;
    } else if (filter === 'active') {
      return matchesSearch && chat.isOnline;
    }
    
    return matchesSearch;
  });

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={styles(theme).chatItem}
      onPress={() => router.push({ pathname: '/chat', params: { id: item.id } } as any)}
    >
      <View style={styles(theme).avatarContainer}>
        <Avatar.Text 
          size={50} 
          label={item.studentName.split(' ').map(n => n[0]).join('')}
          color="white"
          style={{ backgroundColor: theme.colors.primary }}
        />
        {item.isOnline && (
          <View style={styles(theme).onlineIndicator} />
        )}
        {item.unread > 0 && (
          <Badge style={styles(theme).badge}>{item.unread}</Badge>
        )}
      </View>
      <View style={styles(theme).chatContent}>
        <View style={styles(theme).chatHeader}>
          <Text variant="titleMedium">{item.studentName}</Text>
          <Text variant="bodySmall" style={styles(theme).timestamp}>{item.timestamp}</Text>
        </View>
        <Text 
          variant="bodyMedium" 
          numberOfLines={2} 
          style={item.unread > 0 ? styles(theme).unreadMessage : {}}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text variant="headlineMedium" style={styles(theme).headerTitle}>Чати</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="cog" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <Searchbar
        placeholder="Пошук чатів"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles(theme).searchbar}
        iconColor={theme.colors.primary}
      />
      
      <View style={styles(theme).filterContainer}>
        <Chip 
          selected={filter === 'all'} 
          onPress={() => setFilter('all')}
          style={styles(theme).filterChip}
          selectedColor={theme.colors.primary}
        >
          Всі
        </Chip>
        <Chip 
          selected={filter === 'unread'} 
          onPress={() => setFilter('unread')}
          style={styles(theme).filterChip}
          selectedColor={theme.colors.primary}
        >
          Непрочитані
        </Chip>
        <Chip 
          selected={filter === 'active'} 
          onPress={() => setFilter('active')}
          style={styles(theme).filterChip}
          selectedColor={theme.colors.primary}
        >
          Онлайн
        </Chip>
      </View>
      
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        contentContainerStyle={styles(theme).listContent}
        ListEmptyComponent={() => (
          <View style={styles(theme).emptyContainer}>
            <MaterialCommunityIcons 
              name="chat-remove" 
              size={64} 
              color={theme.colors.outline} 
            />
            <Text variant="titleMedium" style={styles(theme).emptyText}>
              Немає чатів
            </Text>
            <Text variant="bodyMedium" style={styles(theme).emptySubtext}>
              {searchQuery ? 'Спробуйте змінити пошуковий запит' : 'У вас поки немає активних чатів'}
            </Text>
          </View>
        )}
      />
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  searchbar: {
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: theme.colors.surfaceVariant,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.error,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  timestamp: {
    color: theme.colors.outline,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    textAlign: 'center',
    color: theme.colors.outline,
  },
}); 