import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootBottomParamList = {
  Home: undefined;
  Store: undefined;
  FloatingButton: undefined;
  Wallet: undefined;
  Setting: undefined;
  // Add other screen names and their params as needed
};

export type HomeNavigationProp = BottomTabScreenProps<
  RootBottomParamList,
  'Home'
>;

export type StoreNavigationProp = BottomTabScreenProps<
  RootBottomParamList,
  'Store'
>;
export type FloatingButtonNavigationProp = BottomTabScreenProps<
  RootBottomParamList,
  'FloatingButton'
>;
export type WalletNavigationProp = BottomTabScreenProps<
  RootBottomParamList,
  'Wallet'
>;
export type SettingNavigationProp = BottomTabScreenProps<
  RootBottomParamList,
  'Setting'
>;
