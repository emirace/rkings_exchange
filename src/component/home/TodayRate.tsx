import React, { ReactElement, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import {
  Card,
  Avatar,
  Text,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';
import { useWallet } from '../../context/WalletContext';
import { Wallet } from '../../type/wallet';
import CryptoCard from './CryptoCard';

interface Props extends HomeScreenNavigationProp {
  headerComp: ReactElement;
}

const TodayRate: React.FC<Props> = ({ headerComp, navigation }) => {
  const { colors } = useTheme();
  const { systemWallets, fetchSystemWallets, fetchWallets, loading } =
    useWallet();
  const [refreshing, setRefreshing] = useState(false);

  // Function to render each item in the flat list
  const renderItem = ({ item }: { item: Wallet }) => (
    <CryptoCard item={item} navigation={navigation} />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSystemWallets();
    await fetchWallets();
    setRefreshing(false);
  };

  const Hcomp = () => (
    <>
      {headerComp}
      <Text
        variant="headlineMedium"
        style={[
          styles.headerText,
          {
            fontSize: getResponsiveFontSize(28),
            marginTop: getResponsiveHeight(30),
          },
        ]}
      >
        Today's Rates
      </Text>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={systemWallets.filter((wal) => wal.type === 'Crypto')}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Hcomp}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveWidth(20),
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
  },
});

export default TodayRate;
