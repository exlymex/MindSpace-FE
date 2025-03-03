import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../common/CustomText/CustomText';
import { useStyles } from '@/hooks';
import { AppTheme } from '@/theme';

interface ErrorMessageProps {
  message: string;
}

const styles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.scale(16),
  },
  errorText: {
    color: theme.colors.error,
  }
});

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { s, theme } = useStyles(styles);
  
  return (
    <View style={s.container}>
      <CustomText variant="ezSubtitleRegular" style={s.errorText}>
        {message}
      </CustomText>
    </View>
  );
}; 