import React, { useState, useEffect } from 'react';
import { FlatList, View, Animated, StyleSheet } from 'react-native';
import CardListItem from './CardListItem';
import { Wallet } from '../../type/wallet';
import { CryptoListNavigationProp } from '../../type/navigation/topNav';
import { Searchbar } from 'react-native-paper';
import { useWallet } from '../../context/WalletContext';
import { Text } from 'react-native-paper';

const CryptoList: React.FC<CryptoListNavigationProp> = ({
  navigation,
  route,
}) => {
  const { systemWallets } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<Wallet[]>([]);
  const scrollY = new Animated.Value(0);

  // Function to render each item in the FlatList
  const renderItem = ({ item }: { item: Wallet }) => (
    <CardListItem
      item={item}
      navigation={navigation}
      screen="DepositCryptoForm"
    />
  );

  // Update filteredData when searchQuery changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = systemWallets.filter(
      (item) =>
        item.type === 'Crypto' &&
        (item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.currency.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredData(filtered);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100], // Adjust the range as needed
                  outputRange: [0, -90], // Adjust the translateY value as needed
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </Animated.View>
      {filteredData.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No cryptocurrencies found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingTop: 70 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  noResultContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default CryptoList;
