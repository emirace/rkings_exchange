export interface CurrencyOption {
  code: Currency;
  name: string;
  flag: string;
}

export enum Currency {
  Bitcoin = 'BTC',
  Ethereum = 'ETH',
  USDollar = 'USD',
  Nigeria = 'NGN',
  SouthAfrican = 'ZAR',
  Euro = 'EUR',
}

export interface IConversionRate {
  _id: string;
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
}
