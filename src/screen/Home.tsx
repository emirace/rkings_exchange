import { View, SafeAreaView } from 'react-native';
import React from 'react';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Icon,
  Text,
  useTheme,
} from 'react-native-paper';
import Logo from '../component/Logo';
import WalletCard from '../component/home/WalletCard';
import TodayRate from '../component/home/TodayRate';

const Home = () => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <Appbar.Header
        mode="small"
        style={{ justifyContent: 'space-between', marginBottom: 20 }}
      >
        <Logo />
        <Avatar.Image
          size={50}
          source={{
            uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png',
          }}
        />
      </Appbar.Header>
      <WalletCard />
      <TodayRate />
    </View>
  );
};

export default Home;
