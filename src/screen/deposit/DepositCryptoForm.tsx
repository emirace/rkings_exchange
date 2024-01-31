import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  HelperText,
  Text,
  Card,
  Divider,
} from 'react-native-paper';
import { Wallet } from '../../type/wallet';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { DepositCryptoFormNavigationProp } from '../../type/navigation/stackNav';
import { data } from '../../constant/data';
import { useDeposit } from '../../context/DepositContext';

const DepositCryptoForm: React.FC<DepositCryptoFormNavigationProp> = ({
  navigation,
  route,
}) => {
  const _goBack = () => navigation.goBack();
  const { wallet, updateWallet, network, updateNetwork } = useDeposit();
  const currency = route.params.currency;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currency) {
      setLoading(true);
      const currentWallet = data.find((wal) => wal.currency === currency);
      if (currentWallet) {
        updateWallet(currentWallet);
      }
      setLoading(false);
    }
  }, [currency]);

  const handleClick = (value: string) => {
    updateNetwork(value);
    navigation.navigate('DepositAddress');
  };

  // Function to render each item in the flat List
  const renderItem = ({ item }: { item: string }) => (
    <>
      <Card
        style={styles.card}
        mode="contained"
        contentStyle={{ backgroundColor: 'transparent' }}
        onPress={() => handleClick(item)}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.textContainer}>
            <Text style={styles.currencyFullName}>{item}</Text>
            <Text style={styles.currencyName}>0.00001</Text>
            <Text style={styles.currencyName}>60mins</Text>
          </View>
          <View style={styles.rateContainer}>
            {/* <Text style={styles.currencyRate}>60mins</Text> */}
          </View>
        </Card.Content>
      </Card>
      <Divider />
    </>
  );

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
          flex: 1,
          padding: getResponsiveHeight(20),
        }}
      >
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
          <Text variant="labelLarge">Select network</Text>
        </View>

        <FlatList
          data={wallet.network}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getResponsiveHeight(30),
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
  },
  card: {
    marginVertical: 10,
    backgroundColor: 'transparent',
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
    color: 'gray',
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
    fontSize: 16,
  },
  percentageChange: {
    fontSize: 14,
  },
});

export default DepositCryptoForm;
