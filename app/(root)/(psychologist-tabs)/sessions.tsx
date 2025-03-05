import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Chip, useTheme, FAB, SegmentedButtons, Avatar, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';

interface SessionItem {
  id: number;
  studentName: string;
  date: string;
  time: string;
  duration: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export default function PsychologistSessions() {
  const theme = useTheme<AppTheme>();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Приклад даних для відображення
  const sessions: SessionItem[] = [
    { 
      id: 1, 
      studentName: 'Анна Коваленко', 
      date: '2023-06-15', 
      time: '14:00', 
      duration: '50 хв',
      status: 'upcoming',
    },
    { 
      id: 2, 
      studentName: 'Іван Петренко', 
      date: '2023-06-16', 
      time: '10:30', 
      duration: '50 хв',
      status: 'upcoming',
    },
    { 
      id: 3, 
      studentName: 'Марія Шевченко', 
      date: '2023-06-10', 
      time: '15:00', 
      duration: '50 хв',
      status: 'completed',
      notes: 'Обговорили проблеми з тривожністю. Рекомендовано техніки дихання та медитації.'
    },
    { 
      id: 4, 
      studentName: 'Олег Сидоренко', 
      date: '2023-06-08', 
      time: '11:00', 
      duration: '50 хв',
      status: 'completed',
      notes: 'Прогрес у подоланні соціальної тривожності. Продовжуємо працювати над впевненістю.'
    },
    { 
      id: 5, 
      studentName: 'Наталія Мельник', 
      date: '2023-06-12', 
      time: '16:30', 
      duration: '50 хв',
      status: 'cancelled',
    },
  ];

  // Фільтрація сесій за статусом та датою
  const filteredSessions = sessions.filter(session => {
    const matchesStatus = 
      (activeTab === 'upcoming' && session.status === 'upcoming') ||
      (activeTab === 'completed' && session.status === 'completed') ||
      (activeTab === 'cancelled' && session.status === 'cancelled');
    
    const matchesDate = !selectedDate || session.date === selectedDate;
    
    return matchesStatus && matchesDate;
  });

  // Отримання унікальних дат для фільтрації
  const uniqueDates = [...new Set(sessions
    .filter(session => 
      (activeTab === 'upcoming' && session.status === 'upcoming') ||
      (activeTab === 'completed' && session.status === 'completed') ||
      (activeTab === 'cancelled' && session.status === 'cancelled')
    )
    .map(session => session.date))];

  // Форматування дати для відображення
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
  };

  const renderSessionCard = (session: SessionItem) => (
    <Card key={session.id} style={styles(theme).sessionCard}>
      <Card.Content>
        <View style={styles(theme).sessionHeader}>
          <View style={styles(theme).studentInfo}>
            <Avatar.Text 
              size={40} 
              label={session.studentName.split(' ').map(n => n[0]).join('')}
              color="white"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text variant="titleMedium">{session.studentName}</Text>
              <Text variant="bodyMedium">{formatDate(session.date)}, {session.time}</Text>
            </View>
          </View>
          <Chip 
            mode="outlined"
            style={[
              styles(theme).statusChip,
              { 
                backgroundColor: 
                  session.status === 'upcoming' ? theme.colors.primaryContainer :
                  session.status === 'completed' ? '#D5F2DF' :
                  '#FEE7E7'
              }
            ]}
            textStyle={{ 
              color: 
                session.status === 'upcoming' ? theme.colors.primary :
                session.status === 'completed' ? '#12B549' :
                '#D12F2C'
            }}
          >
            {session.status === 'upcoming' ? 'Заплановано' : 
             session.status === 'completed' ? 'Завершено' : 'Скасовано'}
          </Chip>
        </View>
        
        <Divider style={{ marginVertical: 12 }} />
        
        <View style={styles(theme).sessionDetails}>
          <View style={styles(theme).detailItem}>
            <MaterialCommunityIcons name="clock-outline" size={20} color={theme.colors.primary} />
            <Text variant="bodyMedium" style={{ marginLeft: 8 }}>{session.duration}</Text>
          </View>
          
          {session.notes && (
            <View style={styles(theme).notesContainer}>
              <Text variant="bodySmall" style={{ color: theme.colors.outline }}>Нотатки:</Text>
              <Text variant="bodyMedium">{session.notes}</Text>
            </View>
          )}
        </View>
        
        <View style={styles(theme).actionButtons}>
          {session.status === 'upcoming' && (
            <>
              <Button 
                mode="contained" 
                onPress={() => {/* Логіка для початку сесії */}}
                style={styles(theme).actionButton}
                icon="video"
              >
                Почати
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => {/* Логіка для скасування */}}
                style={styles(theme).actionButton}
                textColor={theme.colors.error}
              >
                Скасувати
              </Button>
            </>
          )}
          
          {session.status === 'completed' && (
            <Button 
              mode="outlined" 
              onPress={() => {/* Логіка для перегляду деталей */}}
              style={styles(theme).actionButton}
              icon="note-text-outline"
            >
              Деталі
            </Button>
          )}
          
          {session.status === 'cancelled' && (
            <Button 
              mode="outlined" 
              onPress={() => {/* Логіка для перепланування */}}
              style={styles(theme).actionButton}
              icon="calendar-refresh"
            >
              Перепланувати
            </Button>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text variant="headlineMedium" style={styles(theme).headerTitle}>Сесії</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="calendar-month" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <SegmentedButtons
        value={activeTab}
        onValueChange={setActiveTab}
        buttons={[
          { value: 'upcoming', label: 'Заплановані' },
          { value: 'completed', label: 'Завершені' },
          { value: 'cancelled', label: 'Скасовані' },
        ]}
        style={styles(theme).segmentedButtons}
      />
      
      {uniqueDates.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles(theme).dateFiltersContainer}
        >
          <Chip
            selected={selectedDate === null}
            onPress={() => setSelectedDate(null)}
            style={styles(theme).dateChip}
            selectedColor={theme.colors.primary}
          >
            Всі дати
          </Chip>
          {uniqueDates.map(date => (
            <Chip
              key={date}
              selected={selectedDate === date}
              onPress={() => setSelectedDate(date)}
              style={styles(theme).dateChip}
              selectedColor={theme.colors.primary}
            >
              {formatDate(date)}
            </Chip>
          ))}
        </ScrollView>
      )}
      
      <ScrollView contentContainerStyle={styles(theme).content}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map(renderSessionCard)
        ) : (
          <View style={styles(theme).emptyContainer}>
            <MaterialCommunityIcons 
              name="calendar-blank" 
              size={64} 
              color={theme.colors.outline} 
            />
            <Text variant="titleMedium" style={styles(theme).emptyText}>
              Немає сесій
            </Text>
            <Text variant="bodyMedium" style={styles(theme).emptySubtext}>
              {activeTab === 'upcoming' 
                ? 'У вас немає запланованих сесій' 
                : activeTab === 'completed'
                ? 'У вас немає завершених сесій'
                : 'У вас немає скасованих сесій'}
            </Text>
          </View>
        )}
      </ScrollView>
      
      <FAB
        icon="plus"
        style={styles(theme).fab}
        onPress={() => {/* Логіка для створення нової сесії */}}
        color="white"
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
  segmentedButtons: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  dateFiltersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  dateChip: {
    marginRight: 8,
  },
  content: {
    padding: 16,
    paddingBottom: 80, // Додатковий відступ для FAB
  },
  sessionCard: {
    marginBottom: 16,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusChip: {
    borderWidth: 0,
  },
  sessionDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  notesContainer: {
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  actionButton: {
    marginRight: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
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