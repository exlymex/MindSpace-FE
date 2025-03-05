import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Switch, Button, Card, Divider, RadioButton, useTheme, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppTheme } from '@/theme/theme';
import { useStyles } from '@/hooks';

export default function PsychologistSettings() {
  const { s, theme } = useStyles(styles);
  
  // Стан для налаштувань
  const [settings, setSettings] = useState({
    notifications: {
      newMessages: true,
      sessionReminders: true,
      newStudents: true,
      appUpdates: false,
    },
    appearance: {
      theme: 'light', // 'light', 'dark', 'system'
      fontSize: 'medium', // 'small', 'medium', 'large'
    },
    privacy: {
      showOnlineStatus: true,
      allowStudentRequests: true,
      showLastSeen: false,
    },
    language: 'ukrainian', // 'ukrainian', 'english'
  });

  // Функції для оновлення налаштувань
  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      }
    });
  };

  const setTheme = (value: string) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        theme: value,
      }
    });
  };

  const setFontSize = (value: string) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        fontSize: value,
      }
    });
  };

  const togglePrivacy = (key: keyof typeof settings.privacy) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key],
      }
    });
  };

  const setLanguage = (value: string) => {
    setSettings({
      ...settings,
      language: value,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.scrollContent}>
        <Text variant="headlineMedium" style={s.headerTitle}>Налаштування</Text>

        {/* Сповіщення */}
        <Card style={s.card}>
          <Card.Title 
            title="Сповіщення" 
            left={(props) => <MaterialCommunityIcons name="bell" size={24} color={theme.colors.primary} />}
          />
          <Card.Content>
            <List.Item
              title="Нові повідомлення"
              right={() => (
                <Switch
                  value={settings.notifications.newMessages}
                  onValueChange={() => toggleNotification('newMessages')}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider style={s.divider} />
            <List.Item
              title="Нагадування про сесії"
              right={() => (
                <Switch
                  value={settings.notifications.sessionReminders}
                  onValueChange={() => toggleNotification('sessionReminders')}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider style={s.divider} />
            <List.Item
              title="Нові студенти"
              right={() => (
                <Switch
                  value={settings.notifications.newStudents}
                  onValueChange={() => toggleNotification('newStudents')}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider style={s.divider} />
            <List.Item
              title="Оновлення додатку"
              right={() => (
                <Switch
                  value={settings.notifications.appUpdates}
                  onValueChange={() => toggleNotification('appUpdates')}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Зовнішній вигляд */}
        <Card style={s.card}>
          <Card.Title 
            title="Зовнішній вигляд" 
            left={(props) => <MaterialCommunityIcons name="palette" size={24} color={theme.colors.primary} />}
          />
          <Card.Content>
            <Text variant="titleMedium" style={s.sectionTitle}>Тема</Text>
            <RadioButton.Group onValueChange={setTheme} value={settings.appearance.theme}>
              <View style={s.radioOption}>
                <RadioButton value="light" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Світла</Text>
              </View>
              <View style={s.radioOption}>
                <RadioButton value="dark" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Темна</Text>
              </View>
              <View style={s.radioOption}>
                <RadioButton value="system" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Системна</Text>
              </View>
            </RadioButton.Group>

            <Divider style={s.divider} />

            <Text variant="titleMedium" style={s.sectionTitle}>Розмір шрифту</Text>
            <RadioButton.Group onValueChange={setFontSize} value={settings.appearance.fontSize}>
              <View style={s.radioOption}>
                <RadioButton value="small" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Малий</Text>
              </View>
              <View style={s.radioOption}>
                <RadioButton value="medium" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Середній</Text>
              </View>
              <View style={s.radioOption}>
                <RadioButton value="large" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Великий</Text>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Конфіденційність */}
        <Card style={s.card}>
          <Card.Title 
            title="Конфіденційність" 
            left={(props) => <MaterialCommunityIcons name="shield-lock" size={24} color={theme.colors.primary} />}
          />
          <Card.Content>
            <List.Item
              title="Показувати статус онлайн"
              right={() => (
                <Switch
                  value={settings.privacy.showOnlineStatus}
                  onValueChange={() => togglePrivacy('showOnlineStatus')}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider style={s.divider} />
            <List.Item
              title="Дозволити запити від студентів"
              right={() => (
                <Switch
                  value={settings.privacy.allowStudentRequests}
                  onValueChange={() => togglePrivacy('allowStudentRequests')}
                  color={theme.colors.primary}
                />
              )}
            />
            <Divider style={s.divider} />
            <List.Item
              title="Показувати час останнього перебування"
              right={() => (
                <Switch
                  value={settings.privacy.showLastSeen}
                  onValueChange={() => togglePrivacy('showLastSeen')}
                  color={theme.colors.primary}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* Мова */}
        <Card style={s.card}>
          <Card.Title 
            title="Мова" 
            left={(props) => <MaterialCommunityIcons name="translate" size={24} color={theme.colors.primary} />}
          />
          <Card.Content>
            <RadioButton.Group onValueChange={setLanguage} value={settings.language}>
              <View style={s.radioOption}>
                <RadioButton value="ukrainian" color={theme.colors.primary} />
                <Text style={s.radioLabel}>Українська</Text>
              </View>
              <View style={s.radioOption}>
                <RadioButton value="english" color={theme.colors.primary} />
                <Text style={s.radioLabel}>English</Text>
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        {/* Кнопки дій */}
        <View style={s.buttonsContainer}>
          <Button 
            mode="contained" 
            onPress={() => {/* Логіка для збереження налаштувань */}}
            style={s.saveButton}
            icon="content-save"
          >
            Зберегти налаштування
          </Button>
          <Button 
            mode="outlined" 
            onPress={() => {/* Логіка для скидання налаштувань */}}
            style={s.resetButton}
            icon="refresh"
          >
            Скинути до стандартних
          </Button>
        </View>
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
  headerTitle: {
    color: theme.colors.ezPrimary,
    fontWeight: 'bold',
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
  divider: {
    marginVertical: theme.scale(4),
  },
  sectionTitle: {
    color: theme.colors.ezPrimary,
    marginBottom: theme.scale(12),
    fontWeight: 'bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.scale(8),
  },
  radioLabel: {
    marginLeft: theme.scale(8),
    color: theme.colors.ezGrayDark,
  },
  buttonsContainer: {
    marginBottom: theme.scale(24),
  },
  saveButton: {
    marginBottom: theme.scale(12),
    backgroundColor: theme.colors.ezPrimary,
    paddingVertical: theme.scale(8),
    borderRadius: theme.scale(8),
  },
  resetButton: {
    borderColor: theme.colors.ezPrimary,
    paddingVertical: theme.scale(8),
    borderRadius: theme.scale(8),
  },
}); 