import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { CustomText } from '@/components';
import { useRouter } from 'expo-router';
import { useStyles } from '@/hooks';
import { styles } from './styles';

export function QuickActions() {
  const router = useRouter();
  const { s } = useStyles(styles);

  return (
    <View style={s.container}>
      <CustomText variant="ezH3Semi" style={s.title}>
        Швидкі дії
      </CustomText>
      <View style={s.buttonsContainer}>
        <Button
          mode="contained"
          onPress={() => router.push('/sessions')}
          style={s.button}
        >
          Забронювати сесію
        </Button>
        <Button
          mode="contained"
          onPress={() => router.push('/chat')}
          style={s.button}
        >
          Написати психологу
        </Button>
        <Button
          mode="contained"
          onPress={() => router.push('/materials')}
          style={s.button}
        >
          Переглянути матеріали
        </Button>
      </View>
    </View>
  );
} 