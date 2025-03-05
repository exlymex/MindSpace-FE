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
import { useGetCurrentUserQuery, useUpdateAvatarMutation } from '@/features/auth/api/authApi';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { getFullAvatarUrl } from '@/utils/getFullAvatarUrl';


export default function PsychologistProfile() {
  const { s, theme } = useStyles(styles);
  const dispatch = useAppDispatch();
  
  // Отримуємо дані користувача
  const { data: user, isLoading, refetch } = useGetCurrentUserQuery();
  // Мутація для оновлення аватара
  const [updateAvatar, { isLoading: isUpdatingAvatar }] = useUpdateAvatarMutation();
  console.log(user);
  
  // Приклад даних профілю
  const [profile, setProfile] = useState({
    name: 'Олена Петренко',
    email: 'olena.petrenko@example.com',
    phone: '+380991234567',
    specialization: 'Клінічний психолог',
    education: 'Національний університет ім. Т.Г. Шевченка',
    experience: '8 років',
    license: 'ПС-12345',
    bio: 'Спеціалізуюсь на когнітивно-поведінковій терапії, допомагаю клієнтам з тривожними розладами, депресією та посттравматичним стресовим розладом.',
    isOnline: true,
    hourlyRate: '800 грн',
    rating: 4.9,
    reviewCount: 124,
  });

  // Функція для вибору зображення з галереї
  const handlePickImage = async () => {
    try {
      // Запитуємо дозвіл на доступ до галереї
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Потрібен дозвіл', 'Для зміни аватара потрібен дозвіл на доступ до галереї');
        return;
      }
      
      // Відкриваємо галерею для вибору зображення
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Створюємо FormData для відправки файлу
        const formData = new FormData();
        const fileUri = result.assets[0].uri;
        const fileName = fileUri.split('/').pop() || 'avatar.jpg';
        
        // @ts-ignore - FormData очікує специфічний тип, але ми знаємо, що це працює
        formData.append('avatar', {
          uri: fileUri,
          name: fileName,
          type: 'image/jpeg',
        });
        
        // Відправляємо запит на оновлення аватара
        try {
          await updateAvatar(formData).unwrap();
          Alert.alert('Успіх', 'Аватар успішно оновлено');
          // Оновлюємо дані користувача
          refetch();
        } catch (error) {
          console.error('Error updating avatar:', error);
          Alert.alert('Помилка', 'Не вдалося оновити аватар');
        }
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Помилка', 'Виникла помилка при виборі зображення');
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scrollContent}>
        <View style={s.header}>
          <Text variant="headlineMedium" style={s.headerTitle}>Мій профіль</Text>
        </View>
        
        <Card style={s.profileCard}>
          <View style={s.avatarContainer}>
            {user?.avatar_url ? (
              <Avatar.Image 
                size={120} 
                source={{ uri: getFullAvatarUrl(user.avatar_url) }} 
                style={s.avatar}
              />
            ) : (
              <Avatar.Icon 
                size={120} 
                icon="account" 
                style={s.avatarPlaceholder}
                color={theme.colors.onSurface}
              />
            )}
            <TouchableOpacity 
              style={s.editAvatarButton}
              onPress={handlePickImage}
              disabled={isUpdatingAvatar}
            >
              <MaterialCommunityIcons name="camera" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          </View>
          
          <Text variant="titleLarge" style={s.name}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text variant="titleMedium" style={s.specialization}>
            {user?.specialization || profile.specialization}
          </Text>
          
          <View style={s.statusContainer}>
            <View style={[s.statusIndicator, profile.isOnline ? s.online : s.offline]} />
            <Text variant="labelLarge" style={s.statusText}>
              {profile.isOnline ? 'Онлайн' : 'Офлайн'}
            </Text>
          </View>
          
          <Divider style={s.divider} />
          
          <View style={s.infoSection}>
            <Text variant="titleMedium" style={s.sectionTitle}>Контактна інформація</Text>
            
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="email" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{user?.email || profile.email}</Text>
            </View>
            
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="phone" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{user?.phone_number || profile.phone}</Text>
            </View>
          </View>
          
          <Divider style={s.divider} />
          
          <View style={s.infoSection}>
            <Text variant="titleMedium" style={s.sectionTitle}>Професійна інформація</Text>
            
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="school" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>{user?.education || profile.education}</Text>
            </View>
            
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="certificate" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>Досвід: {user?.experience_years || profile.experience}</Text>
            </View>
            
            <View style={s.infoRow}>
              <MaterialCommunityIcons name="license" size={24} color={theme.colors.primary} />
              <Text variant="bodyLarge" style={s.infoText}>Ліцензія: {user?.license_number || profile.license}</Text>
            </View>
          </View>
          
          <Divider style={s.divider} />
          
          <View style={s.infoSection}>
            <Text variant="titleMedium" style={s.sectionTitle}>Про мене</Text>
            <Text variant="bodyLarge" style={s.bioText}>{user?.bio || profile.bio}</Text>
          </View>
          
          <Button 
            mode="contained" 
            style={s.editButton}
            onPress={() => router.push('/(root)/(psychologist-tabs)/settings')}
          >
            Редагувати профіль
          </Button>
          
          <Button 
            mode="outlined" 
            style={s.logoutButton}
            onPress={handleLogout}
          >
            Вийти з облікового запису
          </Button>
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
  scrollContent: {
    padding: theme.scale(16),
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.scale(16),
  },
  headerTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  profileCard: {
    padding: theme.scale(16),
    borderRadius: theme.scale(12),
    elevation: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: theme.scale(16),
    position: 'relative',
  },
  avatar: {
    backgroundColor: theme.colors.primary,
  },
  avatarPlaceholder: {
    backgroundColor: theme.colors.surfaceVariant,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: theme.scale(120),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.scale(20),
    width: theme.scale(40),
    height: theme.scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: theme.scale(4),
  },
  specialization: {
    textAlign: 'center',
    color: theme.colors.secondary,
    marginBottom: theme.scale(8),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.scale(16),
  },
  statusIndicator: {
    width: theme.scale(10),
    height: theme.scale(10),
    borderRadius: theme.scale(5),
    marginRight: theme.scale(8),
  },
  online: {
    backgroundColor: theme.colors.ezGreen,
  },
  offline: {
    backgroundColor: theme.colors.ezGrayDark,
  },
  statusText: {
    color: theme.colors.onSurface,
  },
  divider: {
    marginVertical: theme.scale(16),
  },
  infoSection: {
    marginBottom: theme.scale(16),
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: theme.scale(12),
    color: theme.colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.scale(12),
  },
  infoText: {
    marginLeft: theme.scale(12),
    flex: 1,
  },
  bioText: {
    lineHeight: theme.scale(24),
  },
  editButton: {
    marginTop: theme.scale(16),
    marginBottom: theme.scale(8),
  },
  logoutButton: {
    marginBottom: theme.scale(16),
  },
}); 