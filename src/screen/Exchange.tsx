import { View, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import CustomKeyboard from '../component/CustomKeyboard';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { Appbar, useTheme, Text, Icon, Button } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import List from '../component/exchange/List';
import Confirm from '../component/exchange/Confirm';
import { useSwap } from '../context/SwapContext';
import { Wallet } from '../type/wallet';
import CustomBackdrop from '../component/CustomBackdrop';
import { ExchangeNavigationProp } from '../type/navigation/stackNav';

const Exchange: React.FC<ExchangeNavigationProp> = ({ navigation }) => {
  const {
    swapAmount,
    selectedWalletFrom,
    selectedWalletTo,
    setSwapAmount,
    setSelectedWalletFrom,
    setSelectedWalletTo,
  } = useSwap();
  const { colors } = useTheme();
  const [editing, setEditing] = useState('from');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

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
                  ${swapAmount}
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: '600',
                    fontSize: getResponsiveFontSize(20),
                  }}
                >
                  $22344.87 available
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
                <Text variant="displaySmall" style={{ marginBottom: 10 }}>
                  $12,750.00
                </Text>
                <Text
                  variant="titleMedium"
                  style={{
                    fontWeight: '600',
                    fontSize: getResponsiveFontSize(20),
                  }}
                >
                  Rate $67/#
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
              fontSize: getResponsiveFontSize(22),
              fontWeight: '600',
            }}
            onPress={handleExchange}
            contentStyle={{ height: getResponsiveHeight(60) }}
          >
            Exchange
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
        <Confirm />
      </BottomSheetModal>
    </View>
  );
};

export default Exchange;
