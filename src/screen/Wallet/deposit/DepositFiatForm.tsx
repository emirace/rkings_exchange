import { Animated, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  HelperText,
  TextInput,
  Text,
  Icon,
  useTheme,
  Checkbox,
  RadioButton,
} from 'react-native-paper';
import { Wallet } from '../../../type/wallet';
import List from '../../../component/exchange/List';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
} from '../../../utils/size';
import CustomKeyboard from '../../../component/CustomKeyboard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { getCurrencySymbol } from '../../../utils/currency';
import PaymentMethod from '../../../component/PaymentMethod';
import { DepositFiatFormNavigationProp } from '../../../type/navigation/stackNav';
import { useWallet } from '../../../context/WalletContext';

const DepositFiatForm: React.FC<DepositFiatFormNavigationProp> = ({
  navigation,
  route,
}) => {
  const _goBack = () => navigation.goBack();
  const { systemWallets, depositWallet } = useWallet();

  const currency = route.params.currency;
  const { colors } = useTheme();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = React.useState('');
  const [paymentWallet, setPaymentWallet] = useState<Wallet | null>(null);
  const cursorAnimation = useRef(new Animated.Value(0)).current;
  const [showQuantity, setshowQuantity] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  useEffect(() => {
    const cursorAnimationLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    cursorAnimationLoop.start();

    return () => cursorAnimationLoop.stop();
  }, [cursorAnimation]);

  const cursorWidth = cursorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const handleInput = (value: string) => {
    setText(value);
  };

  useEffect(() => {
    if (currency) {
      setLoading(true);
      const currentWallet = systemWallets.find(
        (wal) => wal.currency === currency
      );
      setWallet(currentWallet || null);
      setLoading(false);
    }
  }, [currency]);

  const handleWalletChange = (item: Wallet) => {
    setPaymentWallet(item);
    setshowQuantity(false);
    bottomSheetModalRef.current?.close();
  };

  const handleDeposit = () => {
    if (!text) return;
    openBottomSheet();
  };

  const onApprove = async (value: any, method: string) => {
    const result = await depositWallet(
      'flutterwave',
      value.transaction_id,
      currency
    );
    console.log(result);
    if (result) {
    } else {
    }
  };

  return loading ? (
    <ActivityIndicator animating={true} />
  ) : !wallet ? (
    <HelperText type="error" visible={!wallet}>
      Invalid Currency
    </HelperText>
  ) : (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
      </Appbar.Header>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          padding: getResponsiveHeight(20),
          paddingBottom: getResponsiveHeight(30),
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginBottom: getResponsiveHeight(20),
            }}
          >
            <Avatar.Image
              source={{ uri: wallet.image }}
              size={getResponsiveHeight(20)}
            />
            <Text
              variant="titleLarge"
              style={{ fontWeight: '600', fontSize: getResponsiveFontSize(22) }}
            >
              Deposit {currency}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <Text variant="labelLarge">Enter amount</Text>
          </View>

          <View
            style={{
              backgroundColor: colors.elevation.level1,
              padding: getResponsiveHeight(20),
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View>
              <Text variant="displaySmall">
                {getCurrencySymbol(wallet.currency)}
                {text}

                <Animated.View
                  style={[
                    {
                      height: 30,
                      width: 2,
                      backgroundColor: colors.onBackground,
                    },
                    { opacity: cursorWidth },
                  ]}
                />
              </Text>
            </View>
          </View>
        </View>

        <View>
          <CustomKeyboard onKeyPress={handleInput} />
          <Button
            mode="contained"
            labelStyle={{
              fontWeight: '800',
            }}
            uppercase
            style={{ borderRadius: 5 }}
            onPress={handleDeposit}
            contentStyle={{ height: getResponsiveHeight(50) }}
          >
            Continue
          </Button>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
      >
        <PaymentMethod
          amount={parseFloat(text)}
          currency={currency}
          onApprove={onApprove}
          methods={['card']}
        />
      </BottomSheetModal>
    </View>
  );
};

export default DepositFiatForm;
