import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Card, Searchbar, Text } from 'react-native-paper';
import { getResponsiveHeight } from '../../utils/size';
import { Wallet } from '../../type/wallet';

interface Props {
  onSelect: (item: Wallet, position?: string) => void;
  position?: string;
}

export const data: Wallet[] = [
  {
    _id: '1',
    image:
      'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg',
    currency: 'USD',
    name: 'US Dollar',

    type: 'Fiat',
    balance: 0,
    convertedBalance: 0,
    network: [],
    address: '',
  },
  {
    _id: '3',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2560px-Flag_of_the_United_Kingdom.svg.png',
    currency: 'GBP',
    name: 'British Pound',

    type: 'Fiat',
    balance: 0,
    convertedBalance: 0,
    network: [],
    address: '',
  },
  {
    _id: '4',
    image:
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png',
    currency: 'JPY',
    name: 'Japanese Yen',

    type: 'Fiat',
    balance: 0,
    convertedBalance: 0,
    network: [],
    address: '',
  },
];

const List: React.FC<Props> = ({ onSelect, position }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleClick = (value: Wallet) => {
    onSelect(value, position);
  };

  // Function to render each item in the flat List
  const renderItem = ({ item }: { item: Wallet }) => (
    <Card style={styles.card} elevation={0} onPress={() => handleClick(item)}>
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
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
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

export default List;
