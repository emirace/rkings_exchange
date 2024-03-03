import React, { useState, useEffect } from 'react';
import { Share, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Icon,
  IconButton,
  Snackbar,
  Text,
} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
} from '../../../utils/size';
import { DepositAddressNavigationProp } from '../../../type/navigation/stackNav';
import { useDeposit } from '../../../context/DepositContext';
import * as Clipboard from 'expo-clipboard';

const DepositAddress: React.FC<DepositAddressNavigationProp> = ({
  navigation,
}) => {
  const { wallet } = useDeposit();
  const _goBack = () => navigation.goBack();
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Simulate fetching the wallet address, replace with your logic
    setTimeout(() => {
      setWalletAddress('test_wallet_address 111');
      setLoading(false);
    }, 1000);
  }, []);

  const handleCopy = async () => {
    Clipboard.setStringAsync(walletAddress);
    onToggleSnackBar();
  };

  const handleShare = async () => {
    try {
      Share.share({
        message: `Deposit to my ${wallet?.currency} wallet: ${walletAddress}`,
      });
    } catch (error) {}
  };

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
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
                Deposit {wallet?.currency}
              </Text>
            </View>
          </View>
          <View style={styles.qrCodeContainer}>
            <QRCode
              value={walletAddress}
              size={200}
              color="black"
              backgroundColor="white"
            />
          </View>
          <View style={styles.walletInfo}>
            <Text style={styles.walletAddress}>{walletAddress}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              paddingVertical: getResponsiveHeight(20),
            }}
          >
            <IconButton icon="content-copy" size={30} onPress={handleCopy} />
            <IconButton icon="share" size={30} onPress={handleShare} />
          </View>
        </View>
      )}
      <Snackbar visible={visible} onDismiss={onDismissSnackBar}>
        Wallet address copied
      </Snackbar>
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
});

export default DepositAddress;
