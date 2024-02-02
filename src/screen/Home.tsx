import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Icon,
  IconButton,
  useTheme,
} from 'react-native-paper';
import Logo from '../component/Logo';
import WalletCard from '../component/home/WalletCard';
import TodayRate from '../component/home/TodayRate';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { HomeScreenNavigationProp } from '../type/navigation/stackNav';
import useAuth from '../context/AuthContext';
import { baseURL } from '../services/api';

const Home: React.FC<HomeScreenNavigationProp> = ({ navigation, route }) => {
  const { user } = useAuth();
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
        {user ? (
          <Button>
            <Avatar.Image
              size={getResponsiveHeight(50)}
              source={{
                uri: baseURL + user.image,
              }}
            />
          </Button>
        ) : // <IconButton
        //   icon={'login-variant'}
        //   size={30}
        //   onPress={() => navigation.navigate('Auth')}
        // />
        null}
      </Appbar.Header>
      <TodayRate
        navigation={navigation}
        route={route}
        headerComp={<WalletCard navigation={navigation} />}
      />
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
