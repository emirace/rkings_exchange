import { StyleSheet, View, Image, Pressable } from 'react-native';
import { ProductProps } from '../type/product';
import { Card, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { HomeScreenNavigationProp } from '../type/navigation/stackNav';
import { baseURL } from '../services/api';

interface Props {
  item: ProductProps;
  index: number;
  navigation: any;
}

const ProductItem: React.FC<Props> = ({ item, index, navigation }) => {
  const { colors } = useTheme();
  const handleClick = () => {
    navigation.navigate('ProductDetail', { productId: item._id });
  };
  return (
    <View
      style={[styles.productItem, index % 2 === 0 ? styles.even : styles.odd]}
    >
      <Pressable onPress={handleClick}>
        <Image
          source={{
            uri: baseURL + item.images[0],
          }}
          style={{ height: '100%' }}
        />
      </Pressable>
      <Text
        style={{
          position: 'absolute',
          backgroundColor: colors.primary,
          color: colors.onPrimary,
          top: 5,
          left: 5,
          padding: 5,
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        50% off
      </Text>
      <View
        style={{
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          paddingHorizontal: 10,
          borderRadius: 10,
          backgroundColor: colors.background,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text
            numberOfLines={1}
            style={{
              fontWeight: '600',
              marginBottom: 5,
              width: getResponsiveWidth(100),
            }}
          >
            {item.name}
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text>${item.sellingPrice}</Text>
            <Text style={{ opacity: 0.5, textDecorationLine: 'line-through' }}>
              ${item.costPrice}
            </Text>
          </View>
        </View>
        <IconButton
          icon="cart"
          size={25}
          onPress={() => console.log('Pressed')}
          iconColor={colors.primary}
        />
      </View>
      {/* Add more product details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    flex: 1,
    marginVertical: getResponsiveHeight(8),
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
    height: getResponsiveHeight(350),
  },
  even: {
    marginLeft: getResponsiveWidth(20),
    marginRight: getResponsiveWidth(8),
  },
  odd: {
    marginLeft: getResponsiveWidth(8),
    marginRight: getResponsiveWidth(20),
  },
});

export default ProductItem;
