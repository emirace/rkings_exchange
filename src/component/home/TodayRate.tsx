import React, { ReactElement } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Avatar, Text, useTheme } from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';
import { useWallet } from '../../context/WalletContext';
import { Wallet } from '../../type/wallet';
import CryptoCard from './CryptoCard';

interface Props extends HomeScreenNavigationProp {
  headerComp: ReactElement;
}

const TodayRate: React.FC<Props> = ({ headerComp, navigation }) => {
  const { colors } = useTheme();
  const { systemWallets, loading } = useWallet();

  // Function to render each item in the flat list
  const renderItem = ({ item }: { item: Wallet }) => (
    <CryptoCard item={item} navigation={navigation} />
  );

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
      {loading ? (
        <Text>Loaing</Text>
      ) : (
        <FlatList
          data={systemWallets}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={Hcomp}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
  },
});

export default TodayRate;
