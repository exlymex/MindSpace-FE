import React, { FC } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useStyles } from '@/hooks';
import { styles } from './styles';
import { CustomText } from '@/components';
import { Material } from '../../types';
import { useRouter } from 'expo-router';
import { IconButton } from 'react-native-paper';

interface MaterialCardProps {
  material: Material;
}

export const MaterialCard: FC<MaterialCardProps> = ({ material }) => {
  const { s, theme } = useStyles(styles);
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={s.container}
      onPress={() => router.push(`/materials/${material.id}`)}
    >
      <Image source={{ uri: material.imageUrl }} style={s.image} />
      <View style={s.content}>
        <CustomText variant="ezH4Semi" style={s.title}>
          {material.title}
        </CustomText>
        <CustomText variant="ezSubtitleRegular" style={s.description}>
          {material.description}
        </CustomText>
        <View style={s.footer}>
          <CustomText variant="ezSubtitleRegular" style={s.readingTime}>
            {material.readingTime} хв читання
          </CustomText>
          <IconButton 
            icon="arrow-right" 
            size={20}
            iconColor={theme.colors.ezPrimary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}; 