import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import {
  Appbar,
  Searchbar,
  Button,
  Card,
  Text,
  useTheme,
  Badge,
} from 'react-native-paper';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ProductProps } from '../../type/product';
import { getResponsiveWidth } from '../../utils/size';
import Filter from '../../component/Filter';
import CustomBackdrop from '../../component/CustomBackdrop';
import ProductItem from '../../component/ProductItem';
import { SearchNavigationProp } from '../../type/navigation/stackNav';
import { useProduct } from '../../context/ProductContext';
import useCart from '../../context/CartContext';

const Search: React.FC<SearchNavigationProp> = ({ navigation, route }) => {
  const { cart } = useCart();
  const { products } = useProduct();
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleFilterToggle = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((item) => item !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Searchbar
          placeholder="Search for products"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={{
            flex: 1,
            marginHorizontal: getResponsiveWidth(5),
          }}
        />
        <Appbar.Action icon="filter" onPress={openBottomSheet} />

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
      <View style={styles.contentContainer}>
        <Text style={styles.resultsText}>Results:</Text>
        <FlatList
          data={products} // Use products directly, as filtering is done in the bottom sheet
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item, index }) => (
            <ProductItem item={item} navigation={navigation} index={index} />
          )}
        />
      </View>

      {/* Bottom Sheet for Filters */}
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['100%']}
        backgroundStyle={{
          backgroundColor: colors.background,
        }}
        enablePanDownToClose={false}
        handleComponent={null}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <Filter
          selectedFilters={selectedFilters}
          onFilterToggle={handleFilterToggle}
          onClose={closeBottomSheet}
        />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: { flex: 1 },
  resultsText: {
    paddingHorizontal: getResponsiveWidth(20),
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default Search;
