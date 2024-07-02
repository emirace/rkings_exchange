import { View, Button } from 'react-native';
import React from 'react';
import {
  Appbar,
  Text,
  List,
  Menu,
  Divider,
  Checkbox,
} from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveWidth } from '../../utils/size';
import { AppearanceNavigationProp } from '../../type/navigation/stackNav';
import useTheme from '../../context/ThemeContext';

const Appearance: React.FC<AppearanceNavigationProp> = ({ navigation }) => {
  const { toggleTheme, selectedThemeMode } = useTheme();

  const options = ['Default', 'Light', 'Dark'];
  const handleClick = (value: any) => {
    toggleTheme(value.toLowerCase());
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Theme" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
        {options.map((option) => (
          <Checkbox.Item
            label={option}
            key={option}
            labelStyle={{ fontSize: getResponsiveFontSize(20) }}
            status={
              selectedThemeMode === option.toLowerCase()
                ? 'checked'
                : 'unchecked'
            }
            onPress={() => handleClick(option)}
          />
        ))}
      </View>
    </View>
  );
};

export default Appearance;
