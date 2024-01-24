// CustomTabBarButton.tsx
import React from 'react';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import { lightTheme } from '../constant/theme';
import { getResponsiveHeight } from '../utils/size';

interface CustomTabBarButtonProps {
  onPress: () => void;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ onPress }) => (
  <View style={{ marginTop: -getResponsiveHeight(60) }}>
    <FAB
      icon="plus"
      color="white"
      style={{ backgroundColor: lightTheme.colors.primary, borderRadius: 100 }}
      onPress={onPress}
      mode="elevated"
      customSize={80}
    />
  </View>
);

export default CustomTabBarButton;
