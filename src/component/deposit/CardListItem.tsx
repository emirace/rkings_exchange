import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import { getResponsiveHeight } from '../../utils/size';
import { Wallet } from '../../type/wallet';
import { DepositNavigationProp } from '../../type/navigation/stackNav';
import {
  CryptoListNavigationProp,
  FiatListNavigationProp,
  RootTopParamList,
} from '../../type/navigation/topNav';

interface Props {
  item: Wallet;
  navigation: any;
  screen: string;
}

const CardListItem: React.FC<Props> = ({ navigation, item, screen }) => {
  const handleClick = (value: Wallet) => {
    navigation.navigate(screen, { currency: value.currency });
  };

  return (
    <Card
      style={styles.card}
      mode="contained"
      onPress={() => handleClick(item)}
    >
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={45} source={{ uri: item.image }} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyFullName}>{item.currency}</Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.rateContainer}>
          {/* <Text style={styles.currencyRate}>{item.rate}</Text> */}
        </View>
      </Card.Content>
    </Card>
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

export default CardListItem;
