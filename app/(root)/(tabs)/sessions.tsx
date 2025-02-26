import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from '@/hooks';
import { SessionsList, SessionsHeader } from '@/features/sessions/components';
import { styles } from '@/features/sessions/styles';

export default function SessionsScreen() {
  const { s } = useStyles(styles);

  return (
    <SafeAreaView style={s.container}>
      <SessionsHeader />
      <SessionsList />
    </SafeAreaView>
  );
} 