import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useStyles } from '@/hooks';
import { AppTheme } from '@/theme';

const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const LoadingIndicator = () => {
  const { s, theme } = useStyles(styles);
  
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={theme.colors.ezPrimary} />
    </View>
  );
}; 