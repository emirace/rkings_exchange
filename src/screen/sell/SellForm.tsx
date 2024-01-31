import { TouchableOpacity, View } from 'react-native';
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
} from 'react-native-paper';
import { Wallet } from '../../type/wallet';
import List, { data } from '../../component/exchange/List';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import CustomKeyboard from '../../component/CustomKeyboard';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { SellFormNavigationProp } from '../../type/navigation/stackNav';

const SellForm: React.FC<SellFormNavigationProp> = ({ navigation, route }) => {
  const _goBack = () => navigation.goBack();
  const currency = route.params.currency;
  const { colors } = useTheme();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = React.useState('');
  const [paymentWallet, setPaymentWallet] = useState<Wallet | null>(null);
  const [showQuantity, setshowQuantity] = useState(false);

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
      const currentWallet = data.find((wal) => wal.currency === currency);
      setWallet(currentWallet || null);
      setLoading(false);
    }
  }, [currency]);

  const handleWalletChange = (item: Wallet) => {
    setPaymentWallet(item);
    setshowQuantity(false);
    bottomSheetModalRef.current?.close();
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
              source={{ uri: wallet.image }}
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
            }}
          >
            <View>
              <Text variant="displaySmall">${text}</Text>
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
            Estimated rate: {showQuantity ? 'Sell' : 'Get'}
          </Text>
        </View>

        <View>
          <CustomKeyboard onKeyPress={handleInput} />
          <Button
            mode="contained"
            labelStyle={{
              fontSize: getResponsiveFontSize(22),
              fontWeight: '600',
            }}
            // onPress={handleExchange}
            contentStyle={{ height: getResponsiveHeight(60) }}
          >
            Sell
          </Button>
        </View>
      </View>

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

export default SellForm;
