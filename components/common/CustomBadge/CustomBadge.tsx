import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomText } from '../CustomText/CustomText';
import { useStyles } from '@/hooks';
import { AppTheme } from '@/theme';

interface CustomBadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

const styles = (theme: AppTheme) => StyleSheet.create({
  badge: {
    borderRadius: theme.scale(12),
    paddingHorizontal: theme.scale(8),
    paddingVertical: theme.scale(4),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: theme.scale(12),
    lineHeight: theme.scale(16),
    textAlign: 'center',
  }
});

export const CustomBadge: React.FC<CustomBadgeProps> = ({ 
  text, 
  backgroundColor, 
  textColor = 'white' 
}) => {
  const { s, theme } = useStyles(styles);
  
  return (
    <View style={[s.badge, { backgroundColor: backgroundColor || theme.colors.ezPrimary }]}>
      <CustomText 
        variant="ezCaptionMedium" 
        style={[s.text, { color: textColor }]}
      >
        {text}
      </CustomText>
    </View>
  );
}; 