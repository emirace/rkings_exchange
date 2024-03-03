import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

export type RootTopParamList = {
  FiatList: { type: string };
  CryptoList: { type: string };
  // Add other screen names and their params as needed
};

export type FiatListNavigationProp = MaterialTopTabScreenProps<
  RootTopParamList,
  'FiatList'
>;

export type CryptoListNavigationProp = MaterialTopTabScreenProps<
  RootTopParamList,
  'CryptoList'
>;
