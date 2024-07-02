import { View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CustomKeyboard from '../component/CustomKeyboard';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import {
  Appbar,
  useTheme,
  Text,
  Icon,
  Button,
  ActivityIndicator,
  Modal,
} from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import List from '../component/exchange/List';
import Confirm from '../component/exchange/Confirm';
import { useSwap } from '../context/SwapContext';
import { Wallet } from '../type/wallet';
import CustomBackdrop from '../component/CustomBackdrop';
import { ExchangeNavigationProp } from '../type/navigation/stackNav';
import { getConversionRate, getCurrencySymbol } from '../utils/currency';
import { useWallet } from '../context/WalletContext';
import { formatNumberWithCommasAndDecimals } from '../utils/helper';
import LoginModal from '../component/auth/LoginModal';

const Exchange: React.FC<ExchangeNavigationProp> = ({ navigation }) => {
  const {
    swapAmount,
    selectedWalletFrom,
    selectedWalletTo,
    setSwapAmount,
    setSelectedWalletFrom,
    setSelectedWalletTo,
    error,
  } = useSwap();
  const { colors } = useTheme();
  const [editing, setEditing] = useState('from');
  const { wallets } = useWallet();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const cursorAnimation = useRef(new Animated.Value(0)).current;
  const [exchange, setExchange] = useState(0);
  const [exchangeLoading, setExchangeLoading] = useState(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    const currentWallet = wallets.find(
      (wal) => wal.currency === selectedWalletFrom.currency
    );
    if (currentWallet) {
      setWallet(currentWallet);
    }
  }, [selectedWalletFrom]);

  const openBottomSheet = (value: string) => {
    if (bottomSheetModalRef.current) {
      setEditing(value);
      bottomSheetModalRef.current.present();
    }
  };

  const openBottomSheet2 = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current.present();
    }
  };

  const onClose = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current?.dismiss();
    }
  };

  const hideModal = () => setVisible(false);

  const handleInput = (value: string) => {
    setSwapAmount(value);
  };

  const _goBack = () => navigation.goBack();

  const handleWalletChange = (item: Wallet, position?: string) => {
    if (position === 'from') {
      setSelectedWalletFrom(item);
    } else if (position === 'to') {
      setSelectedWalletTo(item);
    }
    bottomSheetModalRef.current?.close();
  };

  const handleExchange = () => {
    openBottomSheet2();
  };

  const handleFailed = (value: boolean) => {
    setVisible(value);
    bottomSheetModalRef2.current?.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Exchange" />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: getResponsiveWidth(20),
          justifyContent: 'space-between',
          paddingBottom: 25,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: getResponsiveWidth(5),
          }}
        >
          <View
            style={{
              backgroundColor: colors.elevation.level1,
              justifyContent: 'center',
              padding: 10,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
          >
            <Icon size={30} color={colors.primary} source={'swap-horizontal'} />
          </View>
          <View
            style={{
              flex: 1,
              gap: getResponsiveWidth(5),
            }}
          >
            <View
              style={{
                backgroundColor: colors.elevation.level1,
                padding: getResponsiveHeight(20),
                borderTopRightRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text variant="titleMedium">You have</Text>
                <Text variant="displaySmall" style={{ marginBottom: 10 }}>
                  {getCurrencySymbol(selectedWalletFrom.currency)}
                  {swapAmount}
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
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: '600',
                    fontSize: getResponsiveFontSize(20),
                  }}
                >
                  {getCurrencySymbol(selectedWalletFrom?.currency)}
                  {formatNumberWithCommasAndDecimals(wallet?.balance || 0)}{' '}
                  available
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => openBottomSheet('from')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text variant="titleMedium">
                  {selectedWalletFrom?.currency}
                </Text>
                <Icon
                  size={getResponsiveFontSize(30)}
                  source={'dots-vertical'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: getResponsiveHeight(20),
                backgroundColor: colors.elevation.level1,
                borderBottomRightRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <Text variant="titleMedium">You get</Text>
                <Text
                  numberOfLines={1}
                  variant="displaySmall"
                  style={{ marginBottom: 10 }}
                >
                  {getCurrencySymbol(selectedWalletTo.currency)}
                  {swapAmount
                    ? formatNumberWithCommasAndDecimals(
                        exchange * parseFloat(swapAmount)
                      )
                    : ''}
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: '600',
                    fontSize: getResponsiveFontSize(20),
                  }}
                >
                  Rate {getCurrencySymbol(selectedWalletTo.currency)}
                  {exchangeLoading ? (
                    <ActivityIndicator size={10} />
                  ) : (
                    formatNumberWithCommasAndDecimals(exchange)
                  )}{' '}
                  to {getCurrencySymbol(selectedWalletFrom.currency)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => openBottomSheet('to')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text variant="titleMedium">{selectedWalletTo?.currency}</Text>
                <Icon
                  size={getResponsiveFontSize(30)}
                  source={'dots-vertical'}
                />
              </TouchableOpacity>
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
            onPress={handleExchange}
            contentStyle={{ height: getResponsiveHeight(60) }}
          >
            Exchange
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
            zIndex: 50,
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
          style={{
            marginTop: getResponsiveHeight(20),
            borderRadius: 5,
          }}
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
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <List onSelect={handleWalletChange} position={editing} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef2}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <Confirm
          setVisible={setVisible}
          onClose={onClose}
          navigation={navigation}
        />
      </BottomSheetModal>
    </View>
  );
};

export default Exchange;
