import { View } from 'react-native';
import React from 'react';
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

const Confirm = () => {
  const { swapAmount, selectedWalletFrom, selectedWalletTo } = useSwap();
  const { colors } = useTheme();
  const handleConfirm = () => {};

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
          <Avatar.Image source={{ uri: selectedWalletFrom?.image }} size={40} />
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
            source={{ uri: selectedWalletTo?.image }}
            size={getResponsiveHeight(40)}
          />
          <Text>From</Text>
          <Text variant="headlineSmall">
            {swapAmount} {selectedWalletTo?.currency}
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
      >
        Exchange
      </Button>
    </View>
  );
};

export default Confirm;
