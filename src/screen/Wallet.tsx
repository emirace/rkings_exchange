import { FlatList, View, StyleSheet, Animated } from 'react-native';
import React, { useRef } from 'react';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { Wallet as WalletProps } from '../type/wallet';
import { HomeScreenNavigationProp } from '../type/navigation/stackNav';
import { useWallet } from '../context/WalletContext';
import { getCurrencySymbol } from '../utils/currency';
import { data } from '../constant/data';
import { baseURL } from '../services/api';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import List from '../component/exchange/List';
import CustomBackdrop from '../component/CustomBackdrop';

const Wallet: React.FC<HomeScreenNavigationProp> = ({ navigation }) => {
  const { totalBalance, isVisible, updateIsVisible, wallets, baseCurrency } =
    useWallet();
  const { colors } = useTheme();
  const scrollY = new Animated.Value(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const handleWalletCreate = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const renderItem = ({ item }: { item: WalletProps }) => (
    <Card
      style={[styles.card, { backgroundColor: 'transparent' }]}
      mode="contained"
      // onPress={() => handleClick(item)}
    >
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={45} source={{ uri: baseURL + item.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyFullName}>{item.currency}</Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.rateContainer}>
          <Text style={styles.currencyRate}>
            {getCurrencySymbol(item.currency)}
            {item.balance}
          </Text>
          <Text style={{ opacity: 0.5 }}>
            {getCurrencySymbol(baseCurrency.currency)}
            {item.convertedBalance}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ zIndex: 3 }}>
        <Appbar.Content title="My Assets" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: getResponsiveWidth(20), flex: 1 }}>
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: colors.background,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 150], // Adjust the range as needed
                    outputRange: [0, -200], // Adjust the translateY value as needed
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text>Total Balance</Text>
            <IconButton
              icon={isVisible ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => updateIsVisible(!isVisible)}
            />
          </View>
          <Text
            style={{
              fontSize: getResponsiveFontSize(36),
              marginVertical: getResponsiveHeight(10),
              fontWeight: '600',
            }}
          >
            {isVisible ? (
              <Text
                style={{
                  color: colors.onPrimary,
                  fontWeight: '600',
                  fontSize: getResponsiveFontSize(45),
                }}
              >
                {getCurrencySymbol(baseCurrency.currency)}
                {totalBalance}
              </Text>
            ) : (
              'xxxx'
            )}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: getResponsiveHeight(10),
              marginBottom: getResponsiveHeight(30),
            }}
          >
            <Button
              mode="contained"
              icon={'arrow-down-bold-circle'}
              labelStyle={{
                fontSize: getResponsiveFontSize(22),
                fontWeight: '600',
              }}
              onPress={() => navigation.navigate('Deposit')}
              contentStyle={{ height: getResponsiveHeight(50) }}
            >
              Deposit
            </Button>

            <Button
              mode="outlined"
              icon={'arrow-up-bold-circle'}
              labelStyle={{
                fontSize: getResponsiveFontSize(22),
                fontWeight: '600',
              }}
              // onPress={handleExchange}
              contentStyle={{ height: getResponsiveHeight(50) }}
            >
              Withdrawal
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: getResponsiveHeight(20),
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: getResponsiveFontSize(22),
                fontWeight: '600',
              }}
            >
              Assets
            </Text>
            <IconButton icon={'plus'} size={25} onPress={openBottomSheet} />
          </View>
          <Divider />
        </Animated.View>

        <FlatList
          data={wallets}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: getResponsiveHeight(250) }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
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
        <List onSelect={handleWalletCreate} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getResponsiveHeight(30),
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: getResponsiveWidth(20),
  },
  headerText: {
    fontWeight: '600',
  },
  card: {
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 15,
  },
  currencyName: {
    // color: 'gray',
  },
  currencyFullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rateContainer: {
    alignItems: 'flex-end',
  },
  currencyRate: {
    fontWeight: 'bold',
    fontSize: getResponsiveFontSize(20),
  },
  percentageChange: {
    fontSize: 14,
  },
});

export default Wallet;
