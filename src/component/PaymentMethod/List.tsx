import { View, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { Avatar, Card, Searchbar, Text } from 'react-native-paper';
import { getResponsiveHeight } from '../../utils/size';
import { Wallet } from '../../type/wallet';
import { useWallet } from '../../context/WalletContext';
import { baseURL } from '../../services/api';

interface Props {
  onSelect: (item: Wallet, position?: string) => void;
  position?: string;
}

const List: React.FC<Props> = ({ onSelect, position }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { wallets } = useWallet();

  const handleClick = (value: Wallet) => {
    onSelect(value, position);
  };

  // Function to render each item in the flat List
  const renderItem = ({ item }: { item: Wallet }) => (
    <Card
      style={[styles.card, { backgroundColor: 'transparent' }]}
      mode="contained"
      onPress={() => handleClick(item)}
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
        data={wallets}
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
