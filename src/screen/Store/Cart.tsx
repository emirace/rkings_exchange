import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import {
  Text,
  Button,
  Card,
  IconButton,
  Appbar,
  useTheme,
  Divider,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { CartNavigationProp } from '../../type/navigation/stackNav';
import useCart, { CartItem } from '../../context/CartContext';
import useToastNotification from '../../context/ToastNotificationContext';
import { useProduct } from '../../context/ProductContext';
import { baseURL } from '../../services/api';

const CartScreen: React.FC<CartNavigationProp> = ({ navigation }) => {
  const { cart, removeFromCart, addToCart, subtotal, total, clearCart } =
    useCart();
  const { fetchProductById } = useProduct();
  const { addNotification } = useToastNotification();
  const { colors } = useTheme();

  const handleCheckout = () => {
    if (cart.length < 1) {
      return;
    }
    navigation.navigate('Checkout');
  };

  const handleAddToCart = async (product: CartItem, type: string) => {
    if (type === 'minus') {
      addToCart({ ...product, quantity: product.quantity - 1 });
      return;
    }
    const currentProduct = await fetchProductById(product._id);
    if (currentProduct) {
      if (currentProduct.countInStock > product.quantity + 1) {
        addNotification('Out of stock.');
      } else {
        addToCart({ ...product, quantity: product.quantity + 1 });
      }
    }
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Card.Cover
            source={{ uri: baseURL + item.images[0] }}
            style={styles.cardImage}
          />
          <View>
            <Text style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{ fontWeight: 'bold' }}> {item.category}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: getResponsiveHeight(10),
              }}
            >
              <Text>{item.sellingPrice.toFixed(2)}</Text>
              <Text>Size: {item.selectedSize}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.cardActions, { backgroundColor: colors.primary }]}>
          <IconButton
            icon="plus"
            style={{ margin: 0 }}
            iconColor="white"
            size={15}
            onPress={() => handleAddToCart(item, 'plus')}
          />
          <Text style={{ color: 'white' }}>{item.quantity}</Text>
          <IconButton
            icon={item.quantity > 1 ? 'minus' : 'trash-can'}
            style={{ margin: 0 }}
            iconColor="white"
            size={15}
            onPress={() =>
              item.quantity > 1
                ? handleAddToCart(item, 'minus')
                : removeFromCart(item._id)
            }
          />
        </View>
        {/* <Button
            icon="delete"
            // onPress={() => removeItem(item.id)}
          >
            Remove
          </Button> */}
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Cart" />
        <Appbar.Action
          icon="delete-empty-outline"
          size={25}
          onPress={clearCart}
        />
      </Appbar.Header>
      <FlatList
        data={cart}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
      <View style={{ padding: getResponsiveHeight(20) }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(10),
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(22),
              opacity: 0.5,
            }}
          >
            Subtotal({cart.length} items)
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(22),
              opacity: 0.5,
            }}
          >
            {subtotal}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(10),
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(22),
              opacity: 0.5,
            }}
          >
            Delivery
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(22),
              opacity: 0.5,
            }}
          >
            0
          </Text>
        </View>
        <Divider style={{ marginVertical: 20 }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: getResponsiveHeight(40),
          }}
        >
          <Text
            variant="titleLarge"
            style={{ fontWeight: '600', fontSize: getResponsiveFontSize(22) }}
          >
            Total
          </Text>
          <Text
            variant="titleLarge"
            style={{ fontWeight: '600', fontSize: getResponsiveFontSize(22) }}
          >
            {total}
          </Text>
        </View>
        <Button
          mode="contained"
          labelStyle={{
            fontSize: getResponsiveFontSize(22),
            fontWeight: '600',
          }}
          onPress={handleCheckout}
          contentStyle={{ height: getResponsiveHeight(60) }}
        >
          Check Out
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: getResponsiveHeight(20),
    flex: 1,
  },
  card: {
    marginBottom: getResponsiveHeight(20),
  },
  cardImage: {
    height: getResponsiveHeight(100),
    width: getResponsiveWidth(100),
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: getResponsiveFontSize(20),
    fontWeight: 'bold',
    marginBottom: 8,
    width: getResponsiveWidth(150),
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
    height: getResponsiveHeight(100),
  },
});

export default CartScreen;
