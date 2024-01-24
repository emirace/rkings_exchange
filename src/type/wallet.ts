type WalletType = 'Fiat' | 'Crypto';

export interface Wallet {
  name: string;
  _id: string;
  type: WalletType;
  currency: string;
  balance: number;
  convertedBalance: number;
  image: string;
  network: string[];
  address: string;
}

export interface SystemWalletData {
  name: string;
  type: string;
  currency: string;
  image: string;
}
