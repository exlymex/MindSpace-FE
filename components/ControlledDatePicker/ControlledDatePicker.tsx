import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useStyles } from '@/hooks';
import { AppTheme } from '@/theme';
import { CustomText } from '../common/CustomText/CustomText';

interface ControlledDatePickerProps {
  label: string;
  name: string;
  control: Control<any>;
  maximumDate?: Date;
  minimumDate?: Date;
}

export const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({
  label,
  name,
  control,
  maximumDate,
  minimumDate,
}) => {
  const { s, theme } = useStyles(styles);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={s.container}>
          <CustomText variant="ezSubtitleRegular" style={s.label}>
            {label}
          </CustomText>
          
          <TouchableOpacity
            style={[s.dateButton, error && s.errorBorder]}
            onPress={() => setDatePickerVisible(true)}
          >
            <View style={s.dateButtonContent}>
              <MaterialCommunityIcons 
                name="calendar" 
                size={24} 
                color={theme.colors.ezPrimary} 
              />
              <CustomText variant="ezSubtitleSemi" style={s.dateValue}>
                {format(value, 'dd MMMM yyyy', { locale: uk })}
              </CustomText>
              <MaterialCommunityIcons 
                name="chevron-down" 
                size={24} 
                color={theme.colors.ezGrayDark} 
              />
            </View>
          </TouchableOpacity>
          
          {error && (
            <CustomText variant="ezCaptionMedium" style={s.errorText}>
              {error.message}
            </CustomText>
          )}
          
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              const cleanDate = new Date(date);
              cleanDate.setHours(0, 0, 0, 0);
              onChange(cleanDate);
              setDatePickerVisible(false);
            }}
            onCancel={() => setDatePickerVisible(false)}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            locale="uk"
          />
        </View>
      )}
    />
  );
};

const styles = (theme: AppTheme) => 
  StyleSheet.create({
    container: {
      marginBottom: theme.scale(16),
    },
    label: {
      marginBottom: theme.scale(8),
      color: theme.colors.onBackground,
    },
    dateButton: {
      borderWidth: 1,
      borderColor: theme.colors.ezGrayBackground,
      borderRadius: theme.scale(8),
      padding: theme.scale(12),
      backgroundColor: theme.colors.surface,
    },
    errorBorder: {
      borderColor: theme.colors.error,
    },
    dateButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateValue: {
      flex: 1,
      marginLeft: theme.scale(8),
      color: theme.colors.onBackground,
    },
    errorText: {
      color: theme.colors.error,
      marginTop: theme.scale(4),
    },
  }); 