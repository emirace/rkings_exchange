import { Text } from 'react-native-paper';
import { getBackendErrorMessage } from './error';
import api from '../services/api';

export const getCurrencySymbol = (code: string) => {
  switch (code) {
    case 'USD':
      return <Text>&#x24;</Text>;
    case 'EUR':
      return <Text>&#8364;</Text>;
    case 'GBP':
      return <Text>&#163;</Text>;
    case 'JPY':
      return <Text>&#165;</Text>;
    case 'NGN':
      return <Text>&#8358;</Text>;
    case 'ZAR':
      return <Text>R </Text>;
    case 'CAD':
      return <Text>&#x24;</Text>;
    case 'BTC':
      return <Text>&#8383;</Text>;
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
    console.error(errorMessage);
    // Re-throw the error to propagate it up the call stack if needed
    throw errorMessage;
  }
};
