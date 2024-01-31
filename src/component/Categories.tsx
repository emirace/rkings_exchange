import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { useTheme } from 'react-native-paper';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: '0', name: 'All' },
  { id: '1', name: 'Category 1' },
  { id: '2', name: 'Category 2' },
  { id: '3', name: 'Category 3' },
  // Add more categories as needed
];

const CategoryList: React.FC = () => {
  const { colors } = useTheme();
  const [selectedCat, setSelectedCat] = useState('All');

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor:
            item.name === selectedCat
              ? colors.primary
              : colors.elevation.level1,
        },
      ]}
      onPress={() => setSelectedCat(item.name)}
    >
      <Text
        style={{
          color: item.name === selectedCat ? 'white' : colors.onBackground,
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryList}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    paddingBottom: getResponsiveHeight(20),
    paddingTop: getResponsiveHeight(10),
  },
  categoryItem: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    height: 40,
  },
});

export default CategoryList;
