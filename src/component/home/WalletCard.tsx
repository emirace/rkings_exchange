import { View } from 'react-native';
import React from 'react';
import { Button, Icon, Text, useTheme } from 'react-native-paper';
const WalletCard = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.primary,
        height: 250,
        borderRadius: 30,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        padding: 20,
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text variant="titleLarge" style={{ color: colors.onPrimary }}>
          Current Balance
        </Text>
        <Text variant="displayMedium" style={{ color: colors.onPrimary }}>
          $21983890.00
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Icon size={20} source="chart-bar" color={colors.onPrimary} />
          <Text variant="titleLarge" style={{ color: colors.onPrimary }}>
            Transactions
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <Button
            mode="contained"
            buttonColor={colors.onPrimary}
            textColor={colors.primary}
            labelStyle={{ fontWeight: '600', fontSize: 20 }}
            rippleColor={colors.primaryContainer}
          >
            Buy
          </Button>
          <Button
            mode="contained"
            buttonColor={colors.onPrimary}
            textColor={colors.primary}
            labelStyle={{ fontWeight: '600', fontSize: 20 }}
          >
            Sell
          </Button>
        </View>
      </View>
    </View>
  );
};

export default WalletCard;
