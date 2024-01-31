import React, { useState } from 'react';
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
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { ProductDetailNavigationProp } from '../../type/navigation/stackNav';

const ProductDetail: React.FC<ProductDetailNavigationProp> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  // Sample product details
  const product = {
    name: 'Sample Product',
    images: [
      'https://placekitten.com/600/400', // Sample image URLs
      'https://placekitten.com/601/400', // Add more image URLs as needed
      'https://placekitten.com/602/400',
    ],
    sizeOptions: ['S', 'M', 'L', 'XL'],
    colorOptions: ['Red', 'Blue', 'Green', 'Yellow'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 49.99,
    category: 'Clothing',
    brand: 'Example Brand',
    tags: ['Fashion', 'Casual', 'Summer'],
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
        <Appbar.Action
          icon="heart"
          color={colors.primary}
          containerColor={colors.background}
        />
      </Appbar.Header>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <ScrollView style={styles.contentContainer}>
        <View
          style={[styles.contentbody, { backgroundColor: colors.background }]}
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
            {product.sizeOptions.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: colors.elevation.level3,
                    borderWidth: 1,
                    borderColor:
                      selectedSize === size ? colors.primary : colors.backdrop,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSize === size && { color: colors.primary },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Divider style={styles.divider} />
          <Text style={styles.label}>Color</Text>
          <View style={styles.optionsContainer}>
            {product.colorOptions.map((color) => (
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
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
        </View>
        <Button
          mode="contained"
          labelStyle={{
            fontSize: getResponsiveFontSize(22),
            fontWeight: '600',
          }}
          // onPress={handleExchange}
          contentStyle={{ height: getResponsiveHeight(50) }}
          icon={'cart'}
        >
          Add
        </Button>
      </View>
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
    // resizeMode: 'contain',
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
