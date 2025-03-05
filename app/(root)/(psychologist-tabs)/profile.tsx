import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, Button, Card, Divider, TextInput, Switch, useTheme, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { useStyles } from '@/hooks';
import { router } from 'expo-router';
import { useAppDispatch } from '@/store/store';
import { logout } from '@/store/slices/authSlice';

export default function PsychologistProfile() {
  const { s, theme } = useStyles(styles);
  const dispatch = useAppDispatch();
  
  // Приклад даних профілю
  const [profile, setProfile] = useState({
    name: 'Олена Петренко',
    email: 'olena.petrenko@example.com',
    phone: '+380991234567',
    specialization: 'Клінічний психолог',
    experience: '8 років',
    education: 'Київський національний університет ім. Т. Шевченка',
    about: 'Спеціалізуюсь на когнітивно-поведінковій терапії, працюю з тривожними розладами, депресією та посттравматичним стресовим розладом.',
    workingHours: 'Пн-Пт: 9:00 - 18:00',
    notificationsEnabled: true,
    darkModeEnabled: false,
    language: 'Українська',
  });

  // Функція для виходу з облікового запису
  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scrollContent}>
        {/* Верхня частина профілю */}
        <View style={s.profileHeader}>
          <Avatar.Image 
            size={100} 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={s.avatar}
          />
          <Text variant="headlineSmall" style={s.name}>{profile.name}</Text>
          <Text variant="bodyLarge" style={s.specialization}>{profile.specialization}</Text>
          <Button 
            mode="contained" 
            onPress={() => {/* Логіка для редагування профілю */}}
            style={s.editButton}
            icon="account-edit"
          >
            Редагувати профіль
          </Button>
        </View>

        <Divider style={s.divider} />

        {/* Інформація про контакти */}
        <Card style={s.card}>
          <Card.Title title="Контактна інформація" />
          <Card.Content>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="email" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{profile.email}</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="phone" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{profile.phone}</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="clock" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{profile.workingHours}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Професійна інформація */}
        <Card style={s.card}>
          <Card.Title title="Професійна інформація" />
          <Card.Content>
            <View style={s.infoSection}>
              <Text variant="titleMedium" style={s.sectionTitle}>Досвід:</Text>
              <Text variant="bodyLarge">{profile.experience}</Text>
            </View>
            <View style={s.infoSection}>
              <Text variant="titleMedium" style={s.sectionTitle}>Освіта:</Text>
              <Text variant="bodyLarge">{profile.education}</Text>
            </View>
            <View style={s.infoSection}>
              <Text variant="titleMedium" style={s.sectionTitle}>Про мене:</Text>
              <Text variant="bodyLarge">{profile.about}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Налаштування */}
        <Card style={s.card}>
          <Card.Title title="Налаштування" />
          <Card.Content>
            <View style={s.settingRow}>
              <Text variant="bodyLarge">Сповіщення</Text>
              <Switch 
                value={profile.notificationsEnabled} 
                onValueChange={(value) => 
                  setProfile({...profile, notificationsEnabled: value})
                }
                color={theme.colors.primary}
              />
            </View>
            <View style={s.settingRow}>
              <Text variant="bodyLarge">Темний режим</Text>
              <Switch 
                value={profile.darkModeEnabled} 
                onValueChange={(value) => 
                  setProfile({...profile, darkModeEnabled: value})
                }
                color={theme.colors.primary}
              />
            </View>
            <View style={s.settingRow}>
              <Text variant="bodyLarge">Мова</Text>
              <TouchableOpacity style={s.languageSelector}>
                <Text variant="bodyLarge">{profile.language}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.outline} />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>

        {/* Кнопка виходу */}
        <Button 
          mode="outlined" 
          onPress={handleLogout}
          style={s.logoutButton}
          icon="logout"
          textColor={theme.colors.error}
        >
          Вийти з облікового запису
        </Button>

        {/* Версія додатку */}
        <Text variant="bodySmall" style={s.versionText}>Версія додатку: 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.scale(16),
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: theme.scale(24),
  },
  avatar: {
    marginBottom: theme.scale(12),
    borderWidth: 3,
    borderColor: theme.colors.ezPrimary,
  },
  name: {
    fontWeight: 'bold',
    color: theme.colors.ezPrimary,
    marginBottom: theme.scale(4),
  },
  specialization: {
    color: theme.colors.ezGrayDark,
    marginBottom: theme.scale(12),
  },
  editButton: {
    marginTop: theme.scale(12),
    backgroundColor: theme.colors.ezPrimary,
    paddingVertical: theme.scale(8),
    borderRadius: theme.scale(8),
  },
  divider: {
    marginBottom: theme.scale(16),
  },
  card: {
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
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.scale(12),
  },
  infoText: {
    marginLeft: theme.scale(12),
    color: theme.colors.ezGrayDark,
  },
  infoSection: {
    marginBottom: theme.scale(16),
  },
  sectionTitle: {
    color: theme.colors.ezPrimary,
    marginBottom: theme.scale(4),
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.scale(16),
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginBottom: theme.scale(16),
    borderColor: theme.colors.ezRed,
    paddingVertical: theme.scale(8),
    borderRadius: theme.scale(8),
  },
  versionText: {
    textAlign: 'center',
    color: theme.colors.ezGrayDark,
    marginBottom: theme.scale(16),
  },
}); 