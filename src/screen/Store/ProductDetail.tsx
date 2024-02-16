import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Text,
  Button,
  Divider,
  useTheme,
  Icon,
  Chip,
  ActivityIndicator,
  Badge,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { ProductDetailNavigationProp } from '../../type/navigation/stackNav';
import { ProductProps } from '../../type/product';
import { useProduct } from '../../context/ProductContext';
import useCart from '../../context/CartContext';
import useToastNotification from '../../context/ToastNotificationContext';
import { baseURL } from '../../services/api';
import { formatNumberWithCommasAndDecimals } from '../../utils/helper';
import { useWallet } from '../../context/WalletContext';
import { convertCurrency, getCurrencySymbol } from '../../utils/currency';

const ProductDetail: React.FC<ProductDetailNavigationProp> = ({
  navigation,
  route,
}) => {
  const id = route.params.productId;
  const { colors } = useTheme();
  const { baseCurrency } = useWallet();
  const { fetchProductById } = useProduct();
  const { addNotification } = useToastNotification();
  const { addToCart, cart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const currentProduct = await fetchProductById(id);

        currentProduct.baseCostPrice = await convertCurrency(
          currentProduct.costPrice,
          currentProduct.currency,
          baseCurrency?.currency
        );
        currentProduct.baseSellingPrice = await convertCurrency(
          currentProduct.sellingPrice,
          currentProduct.currency,
          baseCurrency?.currency
        );
        if (currentProduct) {
          setProduct(currentProduct);
        }
        setLoadingPage(false);
      } else {
        setProduct(null);
        setLoadingPage(false);
      }
    }
    fetchData();
  }, [id]);

  const gotoCart = () => {
    navigation.navigate('Cart');
  };

  const handleAddToCart = () => {
    if (!product) return;
    // if (quantity < 1) {
    //   addNotification('Select a valid quantity');
    //   return;
    // }
    if (product?.sizes?.length && !selectedSize) {
      addNotification('Select prefered size');
      return;
    }
    if (product?.colors?.length && !selectedColor) {
      addNotification('Select prefered color');
      return;
    }
    addToCart({ ...product, quantity: 1, selectedSize, selectedColor });
    addNotification('Item added to cart', 'Checkout', gotoCart);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{
          zIndex: 10,
          backgroundColor: 'transparent',
          justifyContent: 'space-between',
        }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />

        <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        >
          <Appbar.Action icon="cart" />
          {cart.length > 0 && (
            <Badge style={{ position: 'absolute' }}>{cart.length}</Badge>
          )}
        </TouchableOpacity>
      </Appbar.Header>
      {loadingPage ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      ) : !product ? (
        <View>
          <Text>Product not found</Text>
        </View>
      ) : (
        <>
          <Image
            source={{ uri: baseURL + product.images[0] }}
            style={styles.image}
          />
          <ScrollView style={styles.contentContainer}>
            <View
              style={[
                styles.contentbody,
                { backgroundColor: colors.background },
              ]}
            >
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.chipContainer}>
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    mode="outlined"
                    icon="tag"
                    style={styles.chip}
                    selectedColor={colors.primary}
                    onPress={() => navigation.navigate('Search', { query: '' })}
                  >
                    {tag}
                  </Chip>
                ))}
              </View>
              <View
                style={{
                  marginBottom: getResponsiveHeight(20),
                  flexDirection: 'row',
                  gap: getResponsiveWidth(40),
                }}
              >
                <View style={{}}>
                  <Text>Category</Text>
                  <Text style={[styles.price]}>{product.category}</Text>
                </View>

                <View>
                  <Text>Brand</Text>
                  <Text style={[styles.price]}>{product.brand}</Text>
                </View>
              </View>
              <Divider />
              <Text style={styles.label}>Size</Text>
              <View style={styles.optionsContainer}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size.size}
                    onPress={() => setSelectedSize(size.size)}
                    style={[
                      styles.optionButton,
                      {
                        backgroundColor: colors.elevation.level3,
                        borderWidth: 1,
                        borderColor:
                          selectedSize === size.size
                            ? colors.primary
                            : colors.backdrop,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedSize === size.size && { color: colors.primary },
                      ]}
                    >
                      {size.size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.label}>Color</Text>
              <View style={styles.optionsContainer}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    style={styles.optionButton}
                    onPress={() => setSelectedColor(color)}
                  >
                    <View
                      style={[
                        styles.overlay,
                        { backgroundColor: color.toLowerCase() },
                      ]}
                    />
                    <View
                      style={[
                        styles.colorOption,
                        { backgroundColor: color.toLowerCase() },
                      ]}
                    >
                      {selectedColor === color && (
                        <Icon size={15} source="check" color="white" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
              <Divider style={styles.divider} />
              <Text style={styles.label}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <View>
              <Text>Price</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Text style={[styles.price, { color: colors.primary }]}>
                  {getCurrencySymbol(baseCurrency.currency)}
                  {formatNumberWithCommasAndDecimals(product.baseSellingPrice)}
                </Text>

                <Text
                  style={[
                    styles.price,
                    { textDecorationLine: 'line-through', opacity: 0.5 },
                  ]}
                >
                  {getCurrencySymbol(baseCurrency.currency)}
                  {formatNumberWithCommasAndDecimals(product.baseCostPrice)}
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              labelStyle={{
                fontWeight: '800',
              }}
              uppercase
              style={{ borderRadius: 5 }}
              onPress={handleAddToCart}
              contentStyle={{ height: getResponsiveHeight(50) }}
              icon={'cart'}
            >
              Add
            </Button>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    height: getResponsiveHeight(700),
    position: 'absolute',
    resizeMode: 'contain',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
  },
  contentbody: {
    marginTop: getResponsiveHeight(580),
    padding: getResponsiveHeight(20),
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    height: getResponsiveHeight(45),
    width: getResponsiveWidth(45),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    position: 'relative',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    marginVertical: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.2,
    borderRadius: 10,
  },
  colorOption: {
    width: getResponsiveHeight(20),
    height: getResponsiveWidth(20),
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: getResponsiveHeight(20),
  },
  chip: {
    margin: 4,
  },
});

export default ProductDetail;
