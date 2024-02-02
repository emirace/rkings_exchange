import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Avatar,
  Icon,
  Text,
  useTheme,
  Divider,
} from 'react-native-paper';
import { useSwap } from '../../context/SwapContext';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { baseURL } from '../../services/api';
import { getConversionRate } from '../../utils/currency';

const Confirm: React.FC<{
  setVisible: (value: boolean) => void;
  navigation: any;
}> = ({ setVisible, navigation }) => {
  const { swapAmount, selectedWalletFrom, selectedWalletTo, transferFunds } =
    useSwap();
  const { colors } = useTheme();
  const [exchange, setExchange] = useState(0);
  const [exchangeLoading, setExchangeLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getExchange = async () => {
      try {
        if (!selectedWalletFrom || !selectedWalletTo) return;
        setExchangeLoading(true);
        const rate = await getConversionRate(
          selectedWalletFrom.currency,
          selectedWalletTo.currency
        );
        setExchange(rate);
        setExchangeLoading(false);
      } catch (error) {
        setExchangeLoading(false);
        // addNotification(getBackendErrorMessage(error));
        setExchange(0);
      }
    };
    getExchange();
  }, [selectedWalletFrom, selectedWalletTo]);

  const handleConfirm = async () => {
    setLoading(true);
    const result = await transferFunds(
      selectedWalletFrom?.currency,
      selectedWalletTo?.currency,
      parseFloat(swapAmount)
    );
    if (result) {
      setLoading(false);
      navigation.navigate('HomeMain');
    } else {
      setLoading(false);
      setVisible(true);
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: getResponsiveHeight(20),
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: getResponsiveHeight(30),
      }}
    >
      <Text variant="headlineSmall" style={{ fontWeight: 'bold' }}>
        Confirm Exchange
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: getResponsiveHeight(20),
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            source={{ uri: baseURL + selectedWalletFrom?.image }}
            size={40}
          />
          <Text>From</Text>
          <Text variant="headlineSmall">
            {swapAmount} {selectedWalletFrom?.currency}
          </Text>
        </View>
        <Icon
          size={getResponsiveHeight(30)}
          color={colors.primary}
          source={'swap-horizontal'}
        />
        <View style={{ alignItems: 'center' }}>
          <Avatar.Image
            source={{ uri: baseURL + selectedWalletTo?.image }}
            size={getResponsiveHeight(40)}
          />
          <Text>To</Text>
          <Text variant="headlineSmall">
            {exchange * parseFloat(swapAmount)} {selectedWalletTo?.currency}
          </Text>
        </View>
      </View>
      <Divider />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(20),
          }}
        >
          <Text
            variant="labelLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            Transaction Fee
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            0
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(20),
          }}
        >
          <Text
            variant="labelLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            Rate
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            {exchange}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(20),
          }}
        >
          <Text
            variant="labelLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            Estimated Time
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontSize: getResponsiveFontSize(20) }}
          >
            Instant
          </Text>
        </View>
      </View>

      <Button
        mode="contained"
        labelStyle={{
          fontSize: getResponsiveFontSize(22),
          fontWeight: '600',
        }}
        onPress={handleConfirm}
        contentStyle={{ height: getResponsiveHeight(60) }}
        loading={loading}
      >
        Exchange
      </Button>
    </View>
  );
};

export default Confirm;
