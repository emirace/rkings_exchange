import { View, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Avatar,
  Card,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import { useWallet } from '../../context/WalletContext';
import { getResponsiveHeight } from '../../utils/size';
import { Wallet } from '../../type/wallet';
import { baseURL } from '../../services/api';
import SelectNetwork from './SelectNetwork';

interface Props {
  closeSheet: () => void;
}

const AddWallet: React.FC<Props> = ({ closeSheet }) => {
  const { wallets, systemWallets, fetchWallets, createUserWallet } =
    useWallet();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentList, setCurrentList] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSelectNetwork, setShowSelectNetwork] = useState(false);
  const [currentWallet, setCurrentWallet] = useState<Wallet | null>(null);

  useEffect(() => {
    const newWallets = systemWallets.filter((wallet) => {
      return !wallets.some(
        (userWallet) => userWallet.currency === wallet.currency
      );
    });
    setCurrentList(newWallets);
  }, [systemWallets, wallets]);

  const closeModal = () => {
    setShowSelectNetwork(false);
  };

  const handleClick = async (current: Wallet) => {
    if (current.type === 'Crypto') {
      setShowSelectNetwork(true);
      setCurrentWallet(current);
    } else {
      setLoading(true);
      const result = await createUserWallet({ name: current.name });
      if (result) {
        closeSheet();
        fetchWallets();
      }
      setLoading(false);
    }
  };

  const createCryptoWallet = async (net: string) => {
    if (!currentWallet) return;
    setLoading(true);
    closeModal();
    const result = await createUserWallet({
      name: currentWallet?.name,
      network: net,
    });
    if (result) {
      closeSheet();
      fetchWallets();
    }
    setLoading(false);
  };

  // Function to render each item in the flat AddWallet
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
  return showSelectNetwork ? (
    <SelectNetwork
      closeModal={closeModal}
      onClick={createCryptoWallet}
      wallet={currentWallet}
    />
  ) : (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={currentList}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      />
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: colors.elevation.level2,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
          }}
        >
          <ActivityIndicator />
        </View>
      )}
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

export default AddWallet;
