import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeMain: undefined;
  Exchange: undefined;
  Buy: undefined;
  BuyForm: { currency: string };
  // Add other screen names and their params as needed
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeMain'
>;

export type ExchangeNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Exchange'
>;

export type BuyNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Buy'
>;

export type BuyFormNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'BuyForm'
>;
