import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useVerification } from '../context/VerificationContext';
import { Text, Button, Modal, Icon, useTheme } from 'react-native-paper'; // Assuming you have a Paper component for buttons
import { getCurrencySymbol } from '../utils/currency';
import { formatNumberWithCommasAndDecimals } from '../utils/helper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { useWithdraw } from '../context/WithdrawContext';
import { useWallet } from '../context/WalletContext';

interface Props {
  amount: number;
  currency: string;
  navigation: any;
  closeModal: () => void;
}

const WithdrawalMethod: React.FC<Props> = ({
  amount,
  currency,
  navigation,
  closeModal,
}) => {
  const { verifications } = useVerification();
  const { fetchWallets } = useWallet();
  const { createWithdrawalRequest, error } = useWithdraw();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const verification = verifications.find((ver) => ver.name === 'account');

  const handleWithdrawal = async () => {
    setLoading(true);
    const result = await createWithdrawalRequest(currency, amount);
    if (result) {
      closeModal();
      fetchWallets();
      navigation.replace('WithdrawalSuccess');
    } else {
      setVisible(true);
    }
    setLoading(false);
  };

  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Text
        variant="headlineSmall"
        style={{ fontWeight: 'bold', marginBottom: 20 }}
      >
        Withdrawal Confirmation
      </Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Bank Details:</Text>
        {verification ? (
          Object.entries(verification.detail || {}).map(([key, value]) => (
            <View style={styles.detailRow} key={key}>
              <Text style={styles.detailKey}>{key}:</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: 'red' }}>
            Verify your account
          </Text>
        )}
        <Text style={styles.info}>Note: Bank details are not editable.</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.details}>
          {getCurrencySymbol(currency)}
          {formatNumberWithCommasAndDecimals(amount)}
        </Text>
      </View>

      <Button
        mode="contained"
        labelStyle={{
          fontWeight: '800',
        }}
        uppercase
        style={{ borderRadius: 5, marginBottom: getResponsiveHeight(30) }}
        onPress={handleWithdrawal}
        contentStyle={{ height: getResponsiveHeight(50) }}
        loading={loading}
      >
        Exchange
      </Button>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={[
          {
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            margin: 20,
            borderRadius: 10,
          },
        ]}
      >
        <Icon source={'message-alert'} size={50} color={colors.primary} />
        <Text
          style={{
            fontWeight: '600',
            fontSize: getResponsiveFontSize(30),
            marginBottom: getResponsiveHeight(20),
          }}
        >
          Transaction failed
        </Text>
        <Text>{error}</Text>
        <Button
          mode="contained"
          labelStyle={{
            fontWeight: '800',
          }}
          uppercase
          style={{ borderRadius: 5, marginTop: getResponsiveHeight(20) }}
          onPress={() => setVisible(false)}
          contentStyle={{ height: getResponsiveHeight(60) }}
        >
          Try again
        </Button>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getResponsiveWidth(20),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
  },
  detailKey: {
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(20),
  },
  detailValue: {
    flex: 1,
    fontSize: getResponsiveFontSize(20),
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  info: {
    fontSize: 12,
    color: 'red',
  },
  confirmButton: {
    marginTop: 20,
  },
});

export default WithdrawalMethod;
