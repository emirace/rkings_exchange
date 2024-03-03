import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Badge,
  useTheme,
  Text,
} from 'react-native-paper';
import Logo from '../../component/Logo';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import CarouselComponent from '../../component/CauroselComponent';
import CategoryList from '../../component/Categories';
import { ProductProps } from '../../type/product';
import ProductItem from '../../component/ProductItem';
import usePage from '../../context/PageContext';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';
import { useProduct } from '../../context/ProductContext';
import useCart from '../../context/CartContext';

const products: ProductProps[] = [];

const Store: React.FC<HomeScreenNavigationProp> = ({ navigation, route }) => {
  const { cart } = useCart();
  const { products, fetchProducts } = useProduct();
  const { setScrollY } = usePage();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Initial page
  const [refreshing, setRefreshing] = useState(false);

  // const loadMoreData = () => {
  //   // Simulate fetching more data, replace with your actual logic
  //   setLoading(true);
  //   // Replace the setTimeout with your actual data fetching logic
  //   setTimeout(() => {
  //     // For demonstration, let's add more dummy products
  //     const moreProducts: ProductProps[] = Array.from(
  //       { length: 5 },
  //       (_, index) => ({
  //         _id: `new-${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}`,
  //         name: `New Product ${index + 1}`,
  //         sellingPrice: 25 + index,
  //         costPrice: 25 + index,
  //         images: [],
  //       })
  //     );
  //     setData((prevData) => [...prevData, ...moreProducts]);
  //     setLoading(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   // Load more data when the page changes
  //   loadMoreData();
  // }, [page]);

  const handleScroll = (event: any) => {
    // Update scrollY value in the context
    setScrollY(event.nativeEvent.contentOffset.y);
    console.log(event.nativeEvent.contentOffset.y);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const headerComp = () => {
    return (
      <>
        <CarouselComponent />
        <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
          <CategoryList />
          <Text
            variant="headlineMedium"
            style={{ fontSize: getResponsiveFontSize(28), fontWeight: '600' }}
          >
            Trending items
          </Text>
        </View>
      </>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header
        mode="small"
        style={{
          justifyContent: 'space-between',
          marginBottom: getResponsiveHeight(20),
        }}
      >
        <Logo />
        <View style={{ flexDirection: 'row' }}>
          <Appbar.Action
            icon="magnify"
            onPress={() => navigation.navigate('Search', { query: '' })}
          />
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
        </View>
      </Appbar.Header>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <ProductItem item={item} index={index} navigation={navigation} />
        )}
        numColumns={2}
        // onEndReached={() => setPage((prevPage) => prevPage + 1)}
        // onEndReachedThreshold={0.1}
        ListHeaderComponent={headerComp}
        // ListFooterComponent={loading ? <ActivityIndicator animating /> : null}
        // style={{ paddingBottom: 100, flex: 1 }}
        ListFooterComponent={<View style={{ height: 120 }}></View>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Store;
