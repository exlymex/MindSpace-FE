import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Searchbar, Avatar, Badge, Divider, useTheme, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';
import { useStyles } from '@/hooks';

interface ChatItem {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  avatar?: string;
  isOnline: boolean;
}

export default function PsychologistChats() {
  const { s, theme } = useStyles(styles);
  const [searchQuery, setSearchQuery] = useState('');

  // Приклад даних для відображення
  const chats: ChatItem[] = [
    { 
      id: 1, 
      name: 'Марія Шевченко', 
      lastMessage: 'Дякую за сьогоднішню сесію, було дуже корисно!',
      time: '14:30',
      unreadCount: 2,
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      isOnline: true
    },
    { 
      id: 2, 
      name: 'Олег Сидоренко', 
      lastMessage: 'Коли у нас наступна зустріч?',
      time: '12:15',
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      isOnline: false
    },
    { 
      id: 3, 
      name: 'Наталія Мельник', 
      lastMessage: 'Я виконала всі вправи, які ви рекомендували',
      time: 'Вчора',
      unreadCount: 1,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      isOnline: true
    },
    { 
      id: 4, 
      name: 'Іван Петренко', 
      lastMessage: 'Можемо перенести сесію на годину пізніше?',
      time: 'Вчора',
      unreadCount: 0,
      isOnline: false
    },
    { 
      id: 5, 
      name: 'Анна Коваленко', 
      lastMessage: 'Дякую за рекомендовану літературу',
      time: '23.06',
      unreadCount: 0,
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      isOnline: false
    },
  ];

  // Фільтрація чатів за пошуком
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={s.chatItem}
      onPress={() => router.push({ pathname: '/chat', params: { studentId: item.id } } as any)}
    >
      <View style={s.avatarContainer}>
        {item.avatar ? (
          <Avatar.Image 
            size={50} 
            source={{ uri: item.avatar }} 
          />
        ) : (
          <Avatar.Text 
            size={50} 
            label={item.name.split(' ').map(n => n[0]).join('')}
            color="white"
            style={{ backgroundColor: theme.colors.primary }}
          />
        )}
        {item.isOnline && (
          <View style={s.onlineIndicator} />
        )}
      </View>
      
      <View style={s.chatContent}>
        <View style={s.chatHeader}>
          <Text variant="titleMedium" numberOfLines={1} style={s.chatName}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={s.chatTime}>
            {item.time}
          </Text>
        </View>
        
        <View style={s.chatFooter}>
          <Text 
            variant="bodyMedium" 
            numberOfLines={1} 
            style={[
              s.lastMessage,
              item.unreadCount > 0 && s.unreadMessage
            ]}
          >
            {item.lastMessage}
          </Text>
          
          {item.unreadCount > 0 && (
            <Badge style={s.badge}>
              {item.unreadCount}
            </Badge>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text variant="headlineMedium" style={s.headerTitle}>Чати</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="filter-variant" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <Searchbar
        placeholder="Пошук чатів"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={s.searchbar}
        iconColor={theme.colors.primary}
      />
      
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <Divider style={s.divider} />}
        contentContainerStyle={s.listContent}
        ListEmptyComponent={() => (
          <View style={s.emptyContainer}>
            <MaterialCommunityIcons 
              name="chat-remove" 
              size={64} 
              color={theme.colors.outline} 
            />
            <Text variant="titleMedium" style={s.emptyText}>
              Чатів не знайдено
            </Text>
            <Text variant="bodyMedium" style={s.emptySubtext}>
              {searchQuery 
                ? 'Спробуйте змінити параметри пошуку' 
                : 'У вас поки немає активних чатів'}
            </Text>
          </View>
        )}
      />
      
      <TouchableOpacity style={s.fab}>
        <MaterialCommunityIcons name="message-plus" size={24} color="white" />
      </TouchableOpacity>
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
  headerTitle: {
    color: theme.colors.ezPrimary,
    fontWeight: 'bold',
  },
  searchbar: {
    marginHorizontal: theme.scale(16),
    marginVertical: theme.scale(8),
    backgroundColor: theme.colors.surface,
    elevation: 2,
  },
  listContent: {
    paddingBottom: theme.scale(80),
  },
  chatItem: {
    flexDirection: 'row',
    padding: theme.scale(16),
  },
  avatarContainer: {
    position: 'relative',
    marginRight: theme.scale(16),
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.ezGreen,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.scale(4),
  },
  chatName: {
    flex: 1,
    marginRight: theme.scale(8),
    color: theme.colors.ezBlack,
  },
  chatTime: {
    color: theme.colors.ezGrayDark,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    color: theme.colors.ezGrayDark,
    marginRight: theme.scale(8),
  },
  unreadMessage: {
    color: theme.colors.ezBlack,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: theme.colors.ezPrimary,
  },
  divider: {
    marginLeft: 70,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.scale(32),
  },
  emptyText: {
    marginTop: theme.scale(16),
    textAlign: 'center',
    color: theme.colors.ezGrayDark,
  },
  emptySubtext: {
    marginTop: theme.scale(8),
    textAlign: 'center',
    color: theme.colors.ezGrayDark,
  },
  fab: {
    position: 'absolute',
    right: theme.scale(16),
    bottom: theme.scale(16),
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.ezPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
}); 