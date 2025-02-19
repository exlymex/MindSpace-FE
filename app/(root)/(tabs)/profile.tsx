import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { CustomText } from '@/components';
import { useAppDispatch } from '@/store/store';
import { setAccessToken } from '@/store/slices/authSlice';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAccessToken(null));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <CustomText variant="ezH2Semi">Профіль</CustomText>
      <Button mode="contained" onPress={handleLogout} style={{ marginTop: 20 }}>
        Вийти
      </Button>
    </View>
  );
} 