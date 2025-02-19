import { View } from 'react-native';
import { CustomText } from '@/components';

export default function MaterialsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <CustomText variant="ezH2Semi">Матеріали</CustomText>
    </View>
  );
} 