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
  Modal,
} from 'react-native-paper';
import { Wallet } from '../../type/wallet';
import List from '../../component/exchange/List';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import CustomKeyboard from '../../component/CustomKeyboard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BuyFormNavigationProp } from '../../type/navigation/stackNav';
import { useWallet } from '../../context/WalletContext';
import { baseURL } from '../../services/api';
import { getConversionRate, getCurrencySymbol } from '../../utils/currency';
import PaymentMethod from '../../component/PaymentMethod';
import CustomBackdrop from '../../component/CustomBackdrop';
import { formatNumberWithCommasAndDecimals } from '../../utils/helper';
import LoginModal from '../../component/auth/LoginModal';
import useAuth from '../../context/AuthContext';
import LoadingText from '../../component/LoadingText';

const BuyForm: React.FC<BuyFormNavigationProp> = ({ navigation, route }) => {
  const { systemWallets, baseCurrency, depositWallet, error } = useWallet();
  const { user, setAuthErrorModalOpen } = useAuth();
  const _goBack = () => navigation.goBack();
  const currency = route.params.currency;
  const { colors } = useTheme();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = React.useState('');
  const [paymentWallet, setPaymentWallet] = useState<Wallet>(baseCurrency);
  const [showQuantity, setshowQuantity] = useState(false);
  const [exchange, setExchange] = useState(0);
  const [exchangeLoading, setExchangeLoading] = useState(true);
  const cursorAnimation = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);
  const [inputError, setInputError] = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const openBottomSheet2 = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current.present();
    }
  };

  const handleInput = (value: string) => {
    setInputError('');
    setText(value);
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

  const hideModal = () => setVisible(false);

  useEffect(() => {
    const getExchange = async () => {
      try {
        if (!currency || !paymentWallet?.currency) return;
        setExchangeLoading(true);
        let rate = 0;
        if (showQuantity) {
          rate = await getConversionRate(currency, paymentWallet.currency);
        } else {
          rate = await getConversionRate(paymentWallet?.currency, currency);
        }
        setExchange(rate);
        setExchangeLoading(false);
      } catch (error) {
        setExchangeLoading(false);
        // addNotification(getBackendErrorMessage(error));
        setExchange(0);
      }
    };
    getExchange();
  }, [currency, paymentWallet, showQuantity]);

  useEffect(() => {
    if (currency) {
      setLoading(true);
      const currentWallet = systemWallets.find(
        (wal) => wal.currency === currency
      );
      setWallet(currentWallet || null);
      setPaymentWallet(baseCurrency);
      setLoading(false);
    }
  }, [currency, baseCurrency]);

  const handleWalletChange = (item: Wallet) => {
    setPaymentWallet(item);
    bottomSheetModalRef.current?.close();
  };

  const onApprove = async (value: any, method: string) => {
    console.log('flu result', value);
    bottomSheetModalRef2.current?.dismiss();
    if (value.status === 'completed' || value.status === 'successful') {
      setLoadingPayment(true);
      const result = await depositWallet(
        method,
        value.transaction_id,
        currency
      );
      if (result) {
        navigation.navigate('HomeMain');
      } else {
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
    setLoadingPayment(false);
  };

  const handleBuy = () => {
    if (!text) {
      setInputError('Enter a valid amount');
      return;
    }
    openBottomSheet2();
  };

  return loading ? (
    <ActivityIndicator animating={true} />
  ) : !wallet ? (
    <HelperText type="error" visible={!wallet}>
      Invalid Currency
    </HelperText>
  ) : (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ justifyContent: 'space-between' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Button
          mode="contained-tonal"
          onPress={() => navigation.navigate('SellForm', { currency })}
        >
          Sell
        </Button>
      </Appbar.Header>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          padding: getResponsiveHeight(20),
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
              source={{ uri: baseURL + wallet.image }}
              size={getResponsiveHeight(20)}
            />
            <Text
              variant="titleLarge"
              style={{ fontWeight: '600', fontSize: getResponsiveFontSize(22) }}
            >
              Buy {currency}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              alignItems: 'flex-end',
            }}
          >
            <Text variant="labelLarge">
              You will {showQuantity ? 'get' : 'pay'}
            </Text>
            <TouchableOpacity onPress={() => setshowQuantity(!showQuantity)}>
              <Icon source={'rotate-3d-variant'} size={30} />
            </TouchableOpacity>
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
                {getCurrencySymbol(
                  showQuantity ? currency : paymentWallet.currency
                )}
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
            <TouchableOpacity
              onPress={() => openBottomSheet()}
              style={{ flexDirection: 'row', alignItems: 'center' }}
            >
              <Text variant="titleLarge">
                {showQuantity ? currency : paymentWallet?.currency}
              </Text>
              <Icon size={getResponsiveFontSize(30)} source={'chevron-down'} />
            </TouchableOpacity>
          </View>
          {text && (
            <View style={{ marginTop: 10, gap: 10 }}>
              <Text variant="labelLarge">
                You will {showQuantity ? 'pay' : 'get'}{' '}
                {getCurrencySymbol(
                  showQuantity ? paymentWallet.currency : currency
                )}
                {exchangeLoading ? (
                  <ActivityIndicator size={10} />
                ) : (
                  formatNumberWithCommasAndDecimals(parseFloat(text) * exchange)
                )}
              </Text>
              <Text variant="labelLarge">
                Rate:{' '}
                {getCurrencySymbol(
                  showQuantity ? paymentWallet.currency : currency
                )}
                {exchangeLoading ? (
                  <ActivityIndicator size={10} />
                ) : (
                  formatNumberWithCommasAndDecimals(exchange)
                )}{' '}
                to{' '}
                {getCurrencySymbol(
                  showQuantity ? currency : paymentWallet.currency
                )}
                1
              </Text>
            </View>
          )}
        </View>
        {inputError && (
          <Text style={{ color: colors.primary }}>{inputError}</Text>
        )}

        <View style={{ marginBottom: getResponsiveHeight(20) }}>
          <CustomKeyboard onKeyPress={handleInput} />
          <Button
            mode="contained"
            labelStyle={{
              fontWeight: '800',
            }}
            uppercase
            style={{ borderRadius: 5 }}
            onPress={handleBuy}
            contentStyle={{ height: getResponsiveHeight(50) }}
          >
            Buy
          </Button>
        </View>
      </View>
      <LoginModal navigation={navigation} />

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
          contentStyle={{ height: getResponsiveHeight(50) }}
        >
          Try again
        </Button>
      </Modal>

      <LoadingText loading={loadingPayment} />

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
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <List onSelect={handleWalletChange} type="Fiat" />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef2}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <PaymentMethod
          amount={showQuantity ? parseFloat(text) * exchange : parseFloat(text)}
          currency={paymentWallet?.currency || ''}
          onApprove={onApprove}
          methods={['card']}
        />
      </BottomSheetModal>
    </View>
  );
};

export default BuyForm;
