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

const sampleCartItems = [
  {
    _id: 1,
    name: 'Sample Product 1',
    image: 'https://placekitten.com/200/300', // Replace with your actual image URL
    category: 'Category A',
    sellingPrice: 29.99,
    selectedSize: 'M',
    quantity: 2,
  },
  {
    _id: 2,
    name: 'Sample Product 2',
    image: 'https://placekitten.com/201/300', // Replace with your actual image URL
    category: 'Category B',
    sellingPrice: 39.99,
    selectedSize: 'L',
    quantity: 1,
  },
  // Add more sample items as needed
];

const CartScreen: React.FC<CartNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };
  const renderItem = ({ item }) => (
    <Card style={styles.card} mode="contained">
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Card.Cover source={{ uri: item.image }} style={styles.cardImage} />
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={{ fontWeight: 'bold' }}> {item.category}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: getResponsiveHeight(10),
              }}
            >
              <Text>${item.sellingPrice.toFixed(2)}</Text>
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
            //   onPress={() => increaseQuantity(item.id)}
          />
          <Text style={{ color: 'white' }}>{item.quantity}</Text>
          <IconButton
            icon={item.quantity > 1 ? 'minus' : 'trash-can'}
            style={{ margin: 0 }}
            iconColor="white"
            size={15}
            //   onPress={() => decreaseQuantity(item.id)}
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
      </Appbar.Header>
      <FlatList
        data={sampleCartItems}
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
            Subtotal(2 items)
          </Text>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(22),
              opacity: 0.5,
            }}
          >
            $657
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
            $10
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
            $4345
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
  },
  cardActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 100,
    height: getResponsiveHeight(100),
  },
});

export default CartScreen;
