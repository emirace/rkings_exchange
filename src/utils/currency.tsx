import { Text } from 'react-native-paper';
import { getBackendErrorMessage } from './error';
import api from '../services/api';
import { StyleProp, TextStyle } from 'react-native';

export const getCurrencySymbol = (
  code: string,
  style?: StyleProp<TextStyle>
) => {
  switch (code) {
    case 'USD':
      return <Text style={style}>&#x24;</Text>;
    case 'EUR':
      return <Text style={style}>&#8364;</Text>;
    case 'GBP':
      return <Text style={style}>&#163;</Text>;
    case 'JPY':
      return <Text style={style}>&#165;</Text>;
    case 'NGN':
      return <Text style={style}>&#8358;</Text>;
    case 'ZAR':
      return <Text style={style}>R </Text>;
    case 'CAD':
      return <Text style={style}>&#x24;</Text>;
    case 'BTC':
      return <Text style={style}>&#8383;</Text>;
    case 'ETH':
      return <Text style={style}>Ξ</Text>;

    // Add more cases for other currency codes and corresponding icons
    default:
      return null; // Return null for unsupported currency codes
  }
};

export const getConversionRate = async (
  from: string,
  to: string
): Promise<any> => {
  try {
    const response: any = await api.get(`/conversionrates/${from}/${to}`);
    if (!response.status) {
      throw 'Error getting rate';
    }
    return response.rate.exchangeRate;
  } catch (error) {
    const errorMessage = getBackendErrorMessage(error);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
};

export const convertCurrency = async (
  amount: number,
  from: string,
  to: string
): Promise<number> => {
  try {
    const exchangeRate = await getConversionRate(from, to);
    return amount * exchangeRate || 0;
  } catch (error) {
    return 0;
  }
};
