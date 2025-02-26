import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from '@/hooks';
import { MaterialsList, MaterialsHeader } from '@/features/materials/components';
import {styles} from '@/features/materials/styles';
export default function MaterialsScreen() {
  const { s } = useStyles(styles);

  return (
    <SafeAreaView style={s.container}>
      <MaterialsHeader />
      <MaterialsList />
    </SafeAreaView>
  );
} 