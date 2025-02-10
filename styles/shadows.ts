export interface IIOSShadow {
  shadowOffset?: { height: number; width: number };
  shadowRadius?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  elevation?: number;
}

interface IShadow {
  android: IIOSShadow | undefined;
  ios: IIOSShadow | undefined;
}

type ShadowName = 'none' | 'small' | 'middle' | 'light';

type IShadowSizes = Record<ShadowName, IShadow>;

export const shadowSizes: IShadowSizes = {
  none: {
    android: { elevation: 0 },
    ios: {
      shadowColor: '#000',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
    },
  },
  small: {
    android: { elevation: 4 },
    ios: {
      shadowOffset: { height: 4, width: 0 },
      shadowRadius: 4,
      shadowColor: '#fff',
      shadowOpacity: 0.12,
    },
  },
  middle: {
    android: { elevation: 8 },
    ios: {
      shadowOffset: { height: 8, width: 0 },
      shadowRadius: 8,
      shadowColor: '#fff',
      shadowOpacity: 0.12,
    },
  },
  light: {
    android: { elevation: 8 },
    ios: {
      shadowColor: '#0407320D',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
    },
  },
};

export default shadowSizes;
