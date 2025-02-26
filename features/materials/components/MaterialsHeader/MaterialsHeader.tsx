import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from '../../styles';
import { CustomText } from '@/components';

export const MaterialsHeader: FC = () => {
  const { s } = useStyles(styles);

  return (
    <View style={s.header}>
      <CustomText variant="ezH3Semi">Корисні матеріали</CustomText>
    </View>
  );
}; 