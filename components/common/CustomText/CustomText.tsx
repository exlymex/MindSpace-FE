import { customText } from 'react-native-paper';

import { fontConfig } from '@/styles';

export type FontConfigKeys = keyof typeof fontConfig;

export const CustomText = customText<FontConfigKeys>();
