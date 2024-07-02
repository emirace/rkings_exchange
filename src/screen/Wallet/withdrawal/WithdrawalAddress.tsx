import React, { useState, useEffect } from 'react';
import { Share, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  Icon,
  IconButton,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../../utils/size';
import { WithdrawalAddressNavigationProp } from '../../../type/navigation/stackNav';
import { useDeposit } from '../../../context/DepositContext';
import * as Clipboard from 'expo-clipboard';
import { useWithdraw } from '../../../context/WithdrawContext';

const WithdrawalAddress: React.FC<WithdrawalAddressNavigationProp> = ({
  navigation,
}) => {
  const { wallet } = useDeposit();
  const { colors } = useTheme();
  const { createWithdrawalRequest } = useWithdraw();
  const _goBack = () => navigation.goBack();
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');

  const handleWithdraw = async () => {
    if (!wallet) {
      setError('Wallet is required');
      return;
    }
    setLoading(true);
    const result = await createWithdrawalRequest(wallet?.currency, amount);
    if (result) {
      navigation.replace('WithdrawalSuccess');
    } else {
      setError('Encounter an error during withdrawal');
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Avatar.Image
              source={{ uri: wallet?.image }}
              size={getResponsiveHeight(20)}
            />
            <Text
              variant="titleLarge"
              style={{
                fontWeight: '600',
                fontSize: getResponsiveFontSize(22),
                marginLeft: 10,
              }}
            >
              Withdraw {wallet?.currency}
            </Text>
          </View>
        </View>
        <Text style={styles.label}>Enter Wallet Address</Text>
        <TextInput
          label="Address"
          value={walletAddress}
          onChangeText={setWalletAddress}
          style={styles.input}
        />
        <Text style={styles.label}>Enter Amount</Text>
        <TextInput
          label="Amount"
          value={walletAddress}
          onChangeText={(text) => setAmount(parseFloat(text))}
          style={styles.input}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          padding: getResponsiveHeight(20),
          backgroundColor: colors.elevation.level2,
          borderRadius: 10,
          margin: getResponsiveHeight(20),
        }}
      >
        <Icon source={'alert'} size={20} color={colors.primary} />
        <Text style={{ flex: 1 }}>
          Ensure you enter the right wallet address only from {wallet?.name} on
          the {wallet?.network} network. Funds send to other network cannot be
          retrieve
        </Text>
      </View>
      <Button
        mode="contained"
        contentStyle={{ height: getResponsiveHeight(50) }}
        onPress={handleWithdraw}
        style={styles.saveButton}
        uppercase
        disabled={loading}
        loading={loading}
      >
        Withdraw
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsiveHeight(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: getResponsiveHeight(20),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrCodeContainer: {
    alignItems: 'center',
  },
  walletInfo: {
    marginTop: getResponsiveHeight(20),
  },
  walletAddress: {
    fontSize: getResponsiveFontSize(25),
    textAlign: 'center',
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copyText: {
    color: 'blue',
  },
  shareText: {
    color: 'green',
  },
  label: { fontWeight: '600' },
  input: {
    marginVertical: getResponsiveHeight(20),
  },
  saveButton: {
    marginVertical: getResponsiveHeight(30),
    marginHorizontal: getResponsiveWidth(20),
    borderRadius: 5,
  },
});

export default WithdrawalAddress;
