import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeMain: undefined;
  Exchange: undefined;
  Buy: undefined;
  BuyForm: { currency: string };
  Sell: undefined;
  SellForm: { currency: string };
  Deposit: undefined;
  DepositFiatForm: { currency: string };
  DepositCryptoForm: { currency: string };
  DepositAddress: undefined;
  ProductDetail: { productId: string };
  Search: { query: string };
  Cart: undefined;
  Checkout: undefined;
  CryptoDetail: { crypto: string };
  Appearance: undefined;
  Currency: undefined;
  Auth: undefined;
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

export type SellNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Sell'
>;

export type SellFormNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SellForm'
>;

export type DepositNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Deposit'
>;

export type DepositFiatFormNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'DepositFiatForm'
>;

export type DepositCryptoFormNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'DepositCryptoForm'
>;

export type DepositAddressNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'DepositAddress'
>;

export type ProductDetailNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type SearchNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Search'
>;

export type CartNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;

export type CheckoutNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Checkout'
>;

export type CryptoDetailNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CryptoDetail'
>;

export type AppearanceNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Appearance'
>;

export type CurrencyNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Currency'
>;

export type AuthNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Auth'
>;
