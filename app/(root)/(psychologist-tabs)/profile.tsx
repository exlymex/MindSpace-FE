import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text, Card, Button, Switch, TextInput, Avatar, useTheme, Divider, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { AppTheme } from '@/theme/theme';
import { logout } from '@/store/slices/authSlice';

export default function PsychologistProfile() {
  const theme = useTheme<AppTheme>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const [isOnline, setIsOnline] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Стан для редагування профілю
  const [profileData, setProfileData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    bio: user?.bio || '',
    phone_number: user?.phone_number || '',
    education: user?.education || '',
    specialization: user?.specialization || '',
    license_number: user?.license_number || '',
    experience_years: user?.experience_years?.toString() || '',
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    // Тут буде логіка для збереження змін профілю
    setIsEditing(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    // Тут буде логіка для оновлення статусу на сервері
  };

  return (
    <SafeAreaView style={styles(theme).container}>
      <ScrollView>
        {/* Заголовок */}
        <View style={styles(theme).header}>
          <Text variant="headlineMedium" style={styles(theme).headerTitle}>Профіль</Text>
          <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
            <MaterialCommunityIcons 
              name={isEditing ? "content-save" : "pencil"} 
              size={24} 
              color={theme.colors.primary} 
            />
          </TouchableOpacity>
        </View>
        
        {/* Основна інформація */}
        <Card style={styles(theme).profileCard}>
          <Card.Content>
            <View style={styles(theme).profileHeader}>
              <View style={styles(theme).avatarContainer}>
                {user?.avatar_url ? (
                  <Avatar.Image 
                    size={80} 
                    source={{ uri: user.avatar_url }} 
                  />
                ) : (
                  <Avatar.Text 
                    size={80} 
                    label={`${user?.first_name?.[0] || ''}${user?.last_name?.[0] || ''}`}
                    color="white"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                )}
                {!isEditing && (
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
                )}
              </View>
              
              <View style={styles(theme).profileInfo}>
                {isEditing ? (
                  <>
                    <TextInput
                      label="Ім'я"
                      value={profileData.first_name}
                      onChangeText={(text) => handleInputChange('first_name', text)}
                      style={styles(theme).input}
                      mode="outlined"
                    />
                    <TextInput
                      label="Прізвище"
                      value={profileData.last_name}
                      onChangeText={(text) => handleInputChange('last_name', text)}
                      style={styles(theme).input}
                      mode="outlined"
                    />
                  </>
                ) : (
                  <>
                    <Text variant="headlineSmall">
                      {user?.first_name} {user?.last_name}
                    </Text>
                    <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                      Психолог
                    </Text>
                  </>
                )}
              </View>
            </View>
            
            {isEditing ? (
              <TextInput
                label="Про себе"
                value={profileData.bio}
                onChangeText={(text) => handleInputChange('bio', text)}
                style={styles(theme).input}
                mode="outlined"
                multiline
                numberOfLines={3}
              />
            ) : (
              user?.bio && (
                <View style={styles(theme).bioContainer}>
                  <Text variant="bodyMedium">{user.bio}</Text>
                </View>
              )
            )}
          </Card.Content>
        </Card>
        
        {/* Контактна інформація */}
        <Card style={styles(theme).sectionCard}>
          <Card.Title title="Контактна інформація" />
          <Card.Content>
            {isEditing ? (
              <TextInput
                label="Номер телефону"
                value={profileData.phone_number}
                onChangeText={(text) => handleInputChange('phone_number', text)}
                style={styles(theme).input}
                mode="outlined"
                keyboardType="phone-pad"
              />
            ) : (
              <List.Item
                title="Номер телефону"
                description={user?.phone_number}
                left={props => <List.Icon {...props} icon="phone" color={theme.colors.primary} />}
              />
            )}
            
            <List.Item
              title="Email"
              description={user?.email}
              left={props => <List.Icon {...props} icon="email" color={theme.colors.primary} />}
            />
          </Card.Content>
        </Card>
        
        {/* Професійна інформація */}
        <Card style={styles(theme).sectionCard}>
          <Card.Title title="Професійна інформація" />
          <Card.Content>
            {isEditing ? (
              <>
                <TextInput
                  label="Освіта"
                  value={profileData.education}
                  onChangeText={(text) => handleInputChange('education', text)}
                  style={styles(theme).input}
                  mode="outlined"
                />
                <TextInput
                  label="Спеціалізація"
                  value={profileData.specialization}
                  onChangeText={(text) => handleInputChange('specialization', text)}
                  style={styles(theme).input}
                  mode="outlined"
                />
                <TextInput
                  label="Номер ліцензії"
                  value={profileData.license_number}
                  onChangeText={(text) => handleInputChange('license_number', text)}
                  style={styles(theme).input}
                  mode="outlined"
                />
                <TextInput
                  label="Років досвіду"
                  value={profileData.experience_years}
                  onChangeText={(text) => handleInputChange('experience_years', text)}
                  style={styles(theme).input}
                  mode="outlined"
                  keyboardType="numeric"
                />
              </>
            ) : (
              <>
                <List.Item
                  title="Освіта"
                  description={user?.education || 'Не вказано'}
                  left={props => <List.Icon {...props} icon="school" color={theme.colors.primary} />}
                />
                <List.Item
                  title="Спеціалізація"
                  description={user?.specialization || 'Не вказано'}
                  left={props => <List.Icon {...props} icon="certificate" color={theme.colors.primary} />}
                />
                <List.Item
                  title="Номер ліцензії"
                  description={user?.license_number || 'Не вказано'}
                  left={props => <List.Icon {...props} icon="license" color={theme.colors.primary} />}
                />
                <List.Item
                  title="Років досвіду"
                  description={user?.experience_years?.toString() || 'Не вказано'}
                  left={props => <List.Icon {...props} icon="calendar-clock" color={theme.colors.primary} />}
                />
              </>
            )}
          </Card.Content>
        </Card>
        
        {/* Кнопки дій */}
        <View style={styles(theme).actionsContainer}>
          {isEditing ? (
            <>
              <Button 
                mode="contained" 
                onPress={handleSaveProfile}
                style={styles(theme).actionButton}
                icon="content-save"
              >
                Зберегти зміни
              </Button>
              <Button 
                mode="outlined" 
                onPress={() => setIsEditing(false)}
                style={styles(theme).actionButton}
              >
                Скасувати
              </Button>
            </>
          ) : (
            <>
              <Button 
                mode="contained" 
                onPress={() => setIsEditing(true)}
                style={styles(theme).actionButton}
                icon="account-edit"
              >
                Редагувати профіль
              </Button>
              <Button 
                mode="outlined" 
                onPress={handleLogout}
                style={styles(theme).actionButton}
                icon="logout"
                textColor={theme.colors.error}
              >
                Вийти
              </Button>
            </>
          )}
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  profileCard: {
    margin: 16,
    marginTop: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bioContainer: {
    marginTop: 8,
  },
  sectionCard: {
    margin: 16,
    marginTop: 0,
  },
  input: {
    marginBottom: 12,
  },
  actionsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  actionButton: {
    marginBottom: 12,
  },
}); 