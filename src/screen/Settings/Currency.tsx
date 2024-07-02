import { View, Button } from 'react-native';
import React from 'react';
import {
  Appbar,
  Text,
  List,
  Menu,
  Divider,
  Checkbox,
} from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveWidth } from '../../utils/size';
import {
  AppearanceNavigationProp,
  CurrencyNavigationProp,
} from '../../type/navigation/stackNav';
import useTheme from '../../context/ThemeContext';
import { useWallet } from '../../context/WalletContext';
import { Wallet } from '../../type/wallet';

const Currency: React.FC<CurrencyNavigationProp> = ({ navigation }) => {
  const { systemWallets, baseCurrency, setBaseCurrency } = useWallet();

  const handleClick = (value: Wallet) => {
    setBaseCurrency(value);
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Currency" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
        {systemWallets
          .filter((wal) => wal.type === 'Fiat')
          .map((option) => (
            <Checkbox.Item
              key={option._id}
              label={option.currency}
              labelStyle={{ fontSize: getResponsiveFontSize(20) }}
              status={
                baseCurrency.currency === option.currency
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() => handleClick(option)}
            />
          ))}
      </View>
    </View>
  );
};

export default Currency;
