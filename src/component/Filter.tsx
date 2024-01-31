import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Button,
  useTheme,
  RadioButton,
  Text,
  Checkbox,
  Icon,
  Appbar,
  TextInput,
} from 'react-native-paper';
import {
  BottomSheetScrollView,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import RangeSlider from 'rn-range-slider';
import CustomSlider from './customSlider';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';

interface FilterComponentProps {
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onClose: () => void;
}

// Sample filter options (replace with your actual filter options)
const categories = ['Category A', 'Category B', 'Category C'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = ['Red', 'Blue', 'Green', 'Yellow'];
const priceRanges = [
  { label: '0-25', value: '0-25' },
  { label: '25-50', value: '25-50' },
  { label: '50-75', value: '50-75' },
  { label: '75+', value: '75+' },
];

const brands = ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E'];

const Filter: React.FC<FilterComponentProps> = ({
  selectedFilters,
  onFilterToggle,
  onClose,
}) => {
  const { colors: themeColors } = useTheme();
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0,
    priceRanges.length - 1,
  ]);

  const [brandQuery, setBrandQuery] = useState<string>('');
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleBrandSearch = (query: string) => {
    setBrandQuery(query);
    if (!query) {
      setFilteredBrands([]);
      return;
    }
    const filtered = brands.filter((brand) =>
      brand.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const handleBrandToggle = (brand: string) => {
    onFilterToggle(brand);
  };

  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Action icon="close" onPress={onClose} />
        <Appbar.Content title="Filter" />
        <Button mode="outlined">Clear</Button>
      </Appbar.Header>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.bottomSheetContent}
      >
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Category</Text>
          {categories.map((category) => (
            <RadioButton.Item
              key={category}
              label={category}
              value={category}
              status={selectedCategory === category ? 'checked' : 'unchecked'}
              onPress={() => handleCategoryChange(category)}
              color={themeColors.primary}
            />
          ))}
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Size</Text>
          <View style={styles.sizeButtons}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                onPress={() => setSelectedSize(size)}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: themeColors.elevation.level3,
                    borderWidth: 1,
                    borderColor:
                      selectedSize === size
                        ? themeColors.primary
                        : themeColors.backdrop,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSize === size && { color: themeColors.primary },
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Color</Text>
          <View style={styles.colorButtons}>
            {colors.map((color) => (
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
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Price Range</Text>
          <CustomSlider handleChange={handlePriceRangeChange} />
        </View>
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Brand</Text>
          <TextInput
            label="Search brand"
            value={brandQuery}
            onChangeText={handleBrandSearch}
            style={styles.brandInput}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
          />
          {filteredBrands.map((brand) => (
            <TouchableOpacity
              key={brand}
              onPress={() => handleBrandToggle(brand)}
              style={[
                styles.brandButton,
                selectedFilters.includes(brand) && styles.activeFilter,
              ]}
            >
              <Text>{brand}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheetScrollView>
      <Button
        mode="contained"
        onPress={onClose}
        style={styles.applyButton}
        labelStyle={{
          fontSize: getResponsiveFontSize(22),
          fontWeight: '600',
        }}
        contentStyle={{ height: getResponsiveHeight(60) }}
      >
        Apply Filters
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    paddingBottom: 32,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeButtons: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  colorButtons: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  rangeSlider: {
    height: 40,
    marginVertical: 8,
  },
  applyButton: {
    marginBottom: getResponsiveHeight(30),
    marginHorizontal: getResponsiveWidth(20),
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
  brandInput: {
    marginVertical: 8,
  },
  brandButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  activeFilter: {},
});

export default Filter;
