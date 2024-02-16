import React, { useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Divider,
  List as ListPaper,
  RadioButton,
  Text,
  useTheme,
  Button,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { Wallet } from '../../type/wallet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getCurrencySymbol } from '../../utils/currency';
import PayWithFlutterwave from 'flutterwave-react-native';
import {
  formatNumberWithCommasAndDecimals,
  generateTransactionRef,
} from '../../utils/helper';
import List from './List';

interface Props {
  amount: number;
  currency: string;
  onApprove: (value: any, method: string) => void;
  methods?: ('wallet' | 'card')[];
}

const PaymentMethod: React.FC<Props> = ({
  amount,
  currency,
  onApprove,
  methods = ['wallet', 'card'],
}) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const { colors } = useTheme();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const isWallet = methods.some((str) => str.includes('wallet'));
  const isCard = methods.some((str) => str.includes('card'));

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleClick = (value: string) => {
    if (!isWallet && value === 'wallet') {
      return;
    }
    if ((!wallet || paymentMethod === 'wallet') && value === 'wallet') {
      openBottomSheet();
    } else {
      setPaymentMethod(value);
    }
  };

  const handleWalletChange = (item: Wallet) => {
    setWallet(item);
    setPaymentMethod('wallet');
    bottomSheetModalRef.current?.close();
  };

  const handlePayment = () => {};

  return (
    <View style={styles.container}>
      <View>
        <Text
          variant="headlineSmall"
          style={{ fontWeight: 'bold', marginBottom: getResponsiveHeight(20) }}
        >
          Payment Method {getCurrencySymbol(currency)}
          {formatNumberWithCommasAndDecimals(amount)}
        </Text>

        <RadioButton.Group
          onValueChange={(value) => handleClick(value)}
          value={paymentMethod}
        >
          <View style={{ opacity: isWallet ? 1 : 0.3 }}>
            <ListPaper.Item
              title={`Wallet${wallet ? ` (${wallet.currency})` : ''}`}
              onPress={() => handleClick('wallet')}
              left={() => (
                <ListPaper.Icon
                  icon="wallet" // Replace with the actual icon name
                  color={paymentMethod === 'wallet' ? colors.primary : ''}
                />
              )}
              disabled={!isWallet}
              right={() => (
                <RadioButton
                  value="wallet"
                  status={paymentMethod === 'wallet' ? 'checked' : 'unchecked'}
                  color={colors.primary}
                />
              )}
              titleStyle={{
                fontSize: getResponsiveFontSize(20),
                fontWeight: '600',
              }}
              style={{ padding: 10 }}
            />
          </View>
          <Divider />

          <View>
            <ListPaper.Item
              title="Card/Bank transfer"
              onPress={() => setPaymentMethod('card')}
              left={() => (
                <ListPaper.Icon
                  icon="credit-card" // Replace with the actual icon name
                  color={paymentMethod === 'card' ? colors.primary : ''}
                />
              )}
              disabled={!isCard}
              right={() => (
                <RadioButton
                  value="card"
                  status={paymentMethod === 'card' ? 'checked' : 'unchecked'}
                  color={colors.primary}
                />
              )}
              titleStyle={{
                fontSize: getResponsiveFontSize(20),
                fontWeight: '600',
              }}
              style={{ padding: 10 }}
            />
            <Divider />
          </View>
        </RadioButton.Group>
      </View>

      {paymentMethod === 'wallet' ? (
        <Button
          mode="contained"
          labelStyle={{
            fontWeight: '800',
          }}
          onPress={handlePayment}
          uppercase
          style={{ borderRadius: 5 }}
          contentStyle={{ height: getResponsiveHeight(50) }}
        >
          Continue
        </Button>
      ) : paymentMethod === 'card' ? (
        <PayWithFlutterwave
          onRedirect={(e) => onApprove(e, paymentMethod)}
          options={{
            tx_ref: generateTransactionRef(10),
            authorization: 'FLWPUBK_TEST-6a1e30713a8c6962ecb7d6cfbda2df69-X',
            customer: {
              email: 'customer-email@example.com',
            },
            amount,
            currency: 'NGN',
            payment_options: 'card',
          }}
          customButton={(props) => (
            <Button
              mode="contained"
              labelStyle={{
                fontWeight: '800',
              }}
              uppercase
              style={{ borderRadius: 5 }}
              onPress={props.onPress}
              disabled={props.disabled}
              contentStyle={{ height: getResponsiveHeight(50) }}
            >
              Continue
            </Button>
          )}
        />
      ) : null}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <List onSelect={handleWalletChange} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveWidth(20),
    paddingVertical: getResponsiveHeight(20),
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: getResponsiveHeight(30),
  },
  paymentButton: {},
  paymentButtonText: {},
});

export default PaymentMethod;
