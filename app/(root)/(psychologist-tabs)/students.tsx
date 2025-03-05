import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Text, Searchbar, Avatar, Chip, Divider, useTheme, Card, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { router } from 'expo-router';

interface StudentItem {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastSession: string | null;
  nextSession: string | null;
  notes: string | null;
  tags: string[];
}

export default function PsychologistStudents() {
  const theme = useTheme<AppTheme>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Приклад даних для відображення
  const students: StudentItem[] = [
    { 
      id: 1, 
      name: 'Марія Шевченко', 
      email: 'maria.shevchenko@example.com',
      phone: '+380991234567',
      status: 'active',
      lastSession: '2023-06-10',
      nextSession: '2023-06-17',
      notes: 'Працюємо над тривожністю та стресом',
      tags: ['тривожність', 'стрес']
    },
    { 
      id: 2, 
      name: 'Олег Сидоренко', 
      email: 'oleg.sydorenko@example.com',
      phone: '+380991234568',
      status: 'active',
      lastSession: '2023-06-08',
      nextSession: '2023-06-15',
      notes: 'Соціальна тривожність, проблеми з комунікацією',
      tags: ['тривожність', 'соціалізація']
    },
    { 
      id: 3, 
      name: 'Наталія Мельник', 
      email: 'natalia.melnyk@example.com',
      phone: '+380991234569',
      status: 'inactive',
      lastSession: '2023-05-20',
      nextSession: null,
      notes: 'Депресивні стани, потребує регулярних сесій',
      tags: ['депресія', 'самотність']
    },
    { 
      id: 4, 
      name: 'Іван Петренко', 
      email: 'ivan.petrenko@example.com',
      phone: '+380991234570',
      status: 'active',
      lastSession: '2023-06-05',
      nextSession: '2023-06-19',
      notes: 'Проблеми з самооцінкою та впевненістю',
      tags: ['самооцінка', 'впевненість']
    },
    { 
      id: 5, 
      name: 'Анна Коваленко', 
      email: 'anna.kovalenko@example.com',
      phone: '+380991234571',
      status: 'active',
      lastSession: '2023-06-12',
      nextSession: '2023-06-26',
      notes: 'Проблеми з концентрацією та увагою',
      tags: ['концентрація', 'увага', 'навчання']
    },
  ];

  // Отримання всіх унікальних тегів
  const allTags = [...new Set(students.flatMap(student => student.tags))];

  // Фільтрація студентів за пошуком та тегами
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = !selectedTag || student.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  // Форматування дати для відображення
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Не заплановано';
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderStudentCard = ({ item }: { item: StudentItem }) => (
    <Card style={styles(theme).studentCard}>
      <Card.Content>
        <View style={styles(theme).studentHeader}>
          <View style={styles(theme).studentInfo}>
            <Avatar.Text 
              size={50} 
              label={item.name.split(' ').map(n => n[0]).join('')}
              color="white"
              style={{ backgroundColor: theme.colors.primary }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text variant="titleMedium">{item.name}</Text>
              <Text variant="bodyMedium">{item.email}</Text>
              <Text variant="bodySmall">{item.phone}</Text>
            </View>
          </View>
          <Chip 
            mode="outlined"
            style={[
              styles(theme).statusChip,
              { 
                backgroundColor: item.status === 'active' ? '#D5F2DF' : '#FEE7E7'
              }
            ]}
            textStyle={{ 
              color: item.status === 'active' ? '#12B549' : '#D12F2C'
            }}
          >
            {item.status === 'active' ? 'Активний' : 'Неактивний'}
          </Chip>
        </View>
        
        <Divider style={{ marginVertical: 12 }} />
        
        <View style={styles(theme).sessionInfo}>
          <View style={styles(theme).infoRow}>
            <Text variant="bodyMedium" style={styles(theme).infoLabel}>Остання сесія:</Text>
            <Text variant="bodyMedium">{formatDate(item.lastSession)}</Text>
          </View>
          <View style={styles(theme).infoRow}>
            <Text variant="bodyMedium" style={styles(theme).infoLabel}>Наступна сесія:</Text>
            <Text variant="bodyMedium">{formatDate(item.nextSession)}</Text>
          </View>
        </View>
        
        {item.notes && (
          <View style={styles(theme).notesContainer}>
            <Text variant="bodySmall" style={{ color: theme.colors.outline }}>Нотатки:</Text>
            <Text variant="bodyMedium" numberOfLines={2}>{item.notes}</Text>
          </View>
        )}
        
        <View style={styles(theme).tagsContainer}>
          {item.tags.map(tag => (
            <Chip 
              key={tag} 
              style={styles(theme).tag}
              onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
              selected={tag === selectedTag}
              selectedColor={theme.colors.primary}
              compact
            >
              {tag}
            </Chip>
          ))}
        </View>
        
        <View style={styles(theme).actionButtons}>
          <Button 
            mode="contained" 
            onPress={() => router.push({ pathname: '/chat', params: { studentId: item.id } } as any)}
            style={styles(theme).actionButton}
            icon="chat"
          >
            Чат
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => {/* Логіка для планування сесії */}}
            style={styles(theme).actionButton}
            icon="calendar-plus"
          >
            Сесія
          </Button>
          <Button 
            mode="text" 
            onPress={() => {/* Логіка для перегляду профілю */}}
            style={styles(theme).actionButton}
            icon="account-details"
          >
            Профіль
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Text variant="headlineMedium" style={styles(theme).headerTitle}>Студенти</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="filter-variant" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      
      <Searchbar
        placeholder="Пошук студентів"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles(theme).searchbar}
        iconColor={theme.colors.primary}
      />
      
      {allTags.length > 0 && (
        <View style={styles(theme).tagsFilterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            <Chip
              selected={selectedTag === null}
              onPress={() => setSelectedTag(null)}
              style={styles(theme).filterChip}
              selectedColor={theme.colors.primary}
            >
              Всі теги
            </Chip>
            {allTags.map(tag => (
              <Chip
                key={tag}
                selected={selectedTag === tag}
                onPress={() => setSelectedTag(tag === selectedTag ? null : tag)}
                style={styles(theme).filterChip}
                selectedColor={theme.colors.primary}
              >
                {tag}
              </Chip>
            ))}
          </ScrollView>
        </View>
      )}
      
      <FlatList
        data={filteredStudents}
        renderItem={renderStudentCard}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles(theme).listContent}
        ListEmptyComponent={() => (
          <View style={styles(theme).emptyContainer}>
            <MaterialCommunityIcons 
              name="account-off" 
              size={64} 
              color={theme.colors.outline} 
            />
            <Text variant="titleMedium" style={styles(theme).emptyText}>
              Студентів не знайдено
            </Text>
            <Text variant="bodyMedium" style={styles(theme).emptySubtext}>
              {searchQuery || selectedTag 
                ? 'Спробуйте змінити параметри пошуку' 
                : 'У вас поки немає студентів'}
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
  tagsFilterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  listContent: {
    padding: 16,
  },
  studentCard: {
    marginBottom: 16,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusChip: {
    borderWidth: 0,
  },
  sessionInfo: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  infoLabel: {
    width: 120,
    color: theme.colors.outline,
  },
  notesContainer: {
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionButton: {
    marginRight: 8,
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