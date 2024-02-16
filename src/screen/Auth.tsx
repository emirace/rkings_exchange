import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Button,
  IconButton,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import {
  getResponsiveHeight,
  getResponsiveFontSize,
  getResponsiveWidth,
} from '../utils/size';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../component/CustomBackdrop';
import Confirm from '../component/exchange/Confirm';
import Login from '../component/auth/Login';
import Signup from '../component/auth/Signup';
import { AuthNavigationProp } from '../type/navigation/stackNav';
import ForgetPassword from '../component/auth/ForgetPassword';
import useAuth from '../context/AuthContext';

interface OnboardingItem {
  id: string;
  backgroundImage: string;
  header: string;
  description: string;
}

const data: OnboardingItem[] = [
  {
    id: '1',
    backgroundImage:
      'https://images.pexels.com/photos/14358442/pexels-photo-14358442.jpeg',
    header: 'Welcome to RKings Exchange',
    description:
      'Embark on a revolutionary shopping experience powered by cryptocurrencies.',
  },
  {
    id: '2',
    backgroundImage:
      'https://images.pexels.com/photos/14358442/pexels-photo-14358442.jpeg',
    header: 'Trade and Exchange',
    description:
      'Easily buy, sell, and exchange cryptocurrencies. Seamlessly manage your digital assets and investments.',
  },
  {
    id: '3',
    backgroundImage:
      'https://images.pexels.com/photos/14358442/pexels-photo-14358442.jpeg',
    header: 'Shop Anytime, Anywhere',
    description:
      'Discover the convenience of using cryptocurrencies for everyday purchases. From goods to services like data, airtime, and gift cards – RKings Exchange has it all.',
  },
];

const WIDTH = Dimensions.get('screen').width;

const OnboardingScreen: React.FC<AuthNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { loading, user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef3 = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (user) {
      navigation.replace('HomeMain');
    }
  }, [user]);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  const openBottomSheet2 = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current.present();
    }
  };

  const openBottomSheet23 = () => {
    if (bottomSheetModalRef3.current) {
      bottomSheetModalRef3.current.present();
    }
  };

  const gotoLogin = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current.dismiss();
    }

    if (bottomSheetModalRef3.current) {
      bottomSheetModalRef3.current.dismiss();
    }
    openBottomSheet();
  };

  const gotoForgetPassword = () => {
    if (bottomSheetModalRef2.current) {
      bottomSheetModalRef2.current.dismiss();
    }

    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.dismiss();
    }
    openBottomSheet23();
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingItem;
    index: number;
  }) => {
    return (
      <ImageBackground
        source={require('../../assets/images/app.jpg')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}
        />

        <Image
          source={require('../../assets/images/logo_white.png')}
          style={styles.logo}
          alt="logo"
        />
        <Text
          style={styles.skip}
          onPress={() => navigation.replace('HomeMain')}
        >
          Skip
        </Text>
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.header}>{item.header}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const { x } = event.nativeEvent.contentOffset;
          const index = Math.round(
            x / (event.nativeEvent.layoutMeasurement.width - 20)
          );
          setCurrentIndex(index);
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? getResponsiveHeight(30) : 0,
          left: 20,
          right: 20,
        }}
      >
        <View style={styles.paginationContainer}>
          {data.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === currentIndex && { backgroundColor: colors.primary },
              ]}
            />
          ))}
        </View>
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          labelStyle={{ fontWeight: '800' }}
          uppercase
          style={{
            marginBottom: getResponsiveHeight(20),
            borderRadius: 5,
          }}
          onPress={openBottomSheet}
        >
          Sign in
        </Button>
        <View style={styles.buttonsContainer}>
          <Text style={styles.registerText}>
            I don't have an account{' '}
            <Text
              style={{ color: colors.primary, fontWeight: '600' }}
              onPress={openBottomSheet2}
            >
              Sign up
            </Text>
          </Text>
          <View style={styles.socialIconsContainer}>
            <IconButton
              icon="facebook"
              size={28}
              iconColor="white"
              style={styles.socialIcon}
            />
            <IconButton
              icon="google-plus"
              size={28}
              iconColor="white"
              style={styles.socialIcon}
            />
          </View>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <Login
          navigation={navigation}
          route={route}
          gotoForgetPassword={gotoForgetPassword}
        />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef2}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <Signup gotoLogin={gotoLogin} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={bottomSheetModalRef3}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <ForgetPassword gotoLogin={gotoLogin} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: WIDTH,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 200,
  },
  textContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    // textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'white',
    // textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: getResponsiveHeight(20),
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  activeDot: {},
  buttonsContainer: {
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    color: 'white',
  },
  socialIconsContainer: {
    flexDirection: 'row',
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  logo: {
    width: getResponsiveWidth(100),
    height: getResponsiveHeight(100),
    objectFit: 'contain',
    marginBottom: getResponsiveHeight(40),
    position: 'absolute',
    top: getResponsiveHeight(70),
    alignSelf: 'center',
  },
  skip: {
    fontWeight: '600',
    color: 'white',
    position: 'absolute',
    top: getResponsiveHeight(50),
    right: getResponsiveWidth(30),
    zIndex: 50,
  },
});

export default OnboardingScreen;
