import { useMemo } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { AppTheme, useAppTheme } from '@/theme';

type GeneralStyle = ViewStyle | ImageStyle | TextStyle;

export const useStyles = <T extends Record<string, GeneralStyle>>(stylesFn: (theme: AppTheme) => T) => {
  const theme = useAppTheme();

  const s = useMemo(() => stylesFn(theme), [stylesFn, theme]);

  return { s, theme };
};
