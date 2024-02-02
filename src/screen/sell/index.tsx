import { FlatList, View, StyleSheet } from 'react-native';
import React from 'react';
import { Appbar, Avatar, Card, Searchbar, Text } from 'react-native-paper';
import { Wallet } from '../../type/wallet';
import { getResponsiveHeight } from '../../utils/size';
import { SellNavigationProp } from '../../type/navigation/stackNav';
import { useWallet } from '../../context/WalletContext';
import { baseURL } from '../../services/api';

const Sell: React.FC<SellNavigationProp> = ({ navigation }) => {
  const { systemWallets, loading } = useWallet();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleClick = (value: Wallet) => {
    navigation.navigate('SellForm', { currency: value.currency });
  };
  const _goBack = () => navigation.goBack();

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
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Sell Crypto" />
      </Appbar.Header>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <FlatList
          data={systemWallets.filter((wal) => wal.type === 'Crypto')}
          keyExtractor={(item) => item._id}
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

export default Sell;
