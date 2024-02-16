import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { LinearGradient } from 'expo-linear-gradient';

interface DataProps {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const data: DataProps[] = [
  {
    id: '1',
    title: 'Welcome to ShopExpress',
    subtitle:
      'Discover a world of endless possibilities with ShopExpress. Your one-stop destination for all your shopping needs.',
    image:
      'https://images.unsplash.com/photo-1675516490928-e8fdfdf65ca8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with your image pths
  },
  {
    id: '2',
    title: 'Effortless Shopping',
    subtitle:
      'Explore a seamless shopping experience with a wide range of products at your fingertips. Find, choose, and order with just a few taps.',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    title: 'Secure Transactions, Fast Delivery',
    subtitle:
      'Shop with confidence using our secure payment options. Enjoy fast and reliable delivery services, bringing your favorite products right to your doorstep',
    image:
      'https://images.unsplash.com/photo-1630750796085-5fa9d4dd2818?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const width = Dimensions.get('screen').width;
const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const renderItem = ({ item }: { item: DataProps }) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
      >
        <LinearGradient
          colors={['transparent', '#000000']}
          style={styles.gradient}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width - getResponsiveWidth(70)}
        loop
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingBottom: getResponsiveHeight(20),
  },
  imageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: getResponsiveHeight(20),
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
});

export default CarouselComponent;
