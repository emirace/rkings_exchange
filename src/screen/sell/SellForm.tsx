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
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import CustomKeyboard from '../../component/CustomKeyboard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SellFormNavigationProp } from '../../type/navigation/stackNav';
import { useWallet } from '../../context/WalletContext';
import { getConversionRate, getCurrencySymbol } from '../../utils/currency';
import { useWithdraw } from '../../context/WithdrawContext';
import { baseURL } from '../../services/api';
import { formatNumberWithCommasAndDecimals } from '../../utils/helper';

const SellForm: React.FC<SellFormNavigationProp> = ({ navigation, route }) => {
  const { systemWallets, baseCurrency, fetchWallets } = useWallet();
  const {
    createWithdrawalRequest,
    error,
    loading: loadingWithdraw,
  } = useWithdraw();
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
  const [status, setStatus] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

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

  const hideModal = () => setVisible(false);

  const handleWalletChange = (item: Wallet) => {
    setPaymentWallet(item);
    setshowQuantity(false);
    bottomSheetModalRef.current?.close();
  };

  const onApprove = async () => {
    const result = await createWithdrawalRequest(
      currency,
      showQuantity ? parseFloat(text) : parseFloat(text) * exchange
    );
    if (result) {
      fetchWallets();
      setStatus(true);
    } else {
      setVisible(true);
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
      <Appbar.Header style={{ justifyContent: 'space-between' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Button
          onPress={() => navigation.navigate('BuyForm', { currency })}
          mode="contained-tonal"
        >
          Buy
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
              Sell {currency}
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
              I want to {showQuantity ? 'Sell' : 'Get'}
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
              marginBottom: getResponsiveHeight(20),
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

          <Text
            variant="titleLarge"
            style={{ marginTop: getResponsiveHeight(5) }}
          >
            Rate:{' '}
            {getCurrencySymbol(
              showQuantity ? paymentWallet.currency : currency
            )}
            {exchangeLoading ? (
              <ActivityIndicator size={10} />
            ) : (
              formatNumberWithCommasAndDecimals(exchange, 9)
            )}{' '}
            to{' '}
            {getCurrencySymbol(
              showQuantity ? currency : paymentWallet.currency
            )}
            1
          </Text>
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
            onPress={onApprove}
            contentStyle={{ height: getResponsiveHeight(50) }}
            loading={loadingWithdraw}
          >
            Sell
          </Button>
        </View>
      </View>

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
        <List onSelect={handleWalletChange} type="Fiat" />
      </BottomSheetModal>
    </View>
  );
};

export default SellForm;
