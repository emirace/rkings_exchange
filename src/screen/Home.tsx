import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, useTheme } from 'react-native-paper';
import Logo from '../component/Logo';
import WalletCard from '../component/home/WalletCard';
import TodayRate from '../component/home/TodayRate';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { HomeScreenNavigationProp } from '../type/navigation';

const Home: React.FC<HomeScreenNavigationProp> = ({ navigation, route }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header
        mode="small"
        style={{
          justifyContent: 'space-between',
          marginBottom: getResponsiveHeight(20),
        }}
      >
        <Logo />
        <Avatar.Image
          size={getResponsiveHeight(50)}
          source={{
            uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png',
          }}
        />
      </Appbar.Header>
      <WalletCard navigation={navigation} route={route} />
      <TodayRate />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveWidth(20),
    flex: 1,
  },
});

export default Home;
