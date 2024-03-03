import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CryptoList from '../component/deposit/CryptoList';
import FiatList from '../component/deposit/FiatList';
import { RootTopParamList } from '../type/navigation/topNav';
import { useTheme } from 'react-native-paper';
import { Dimensions } from 'react-native';

interface Props {
  type: string;
}
const Tab = createMaterialTopTabNavigator<RootTopParamList>();
const { width } = Dimensions.get('window');

const TopNavigation: React.FC<Props> = ({ type }) => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: 16, // Adjust the font size of the tab labels
          fontWeight: 'bold', // Set font weight to bold
        },
        tabBarStyle: {
          backgroundColor: colors.background, // Background color of the tab bar
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.primary,
          maxWidth: 0.25 * width,
          marginLeft: 0.093 * width,
          height: 3,
          borderRadius: 5,
        },
      }}
    >
      <Tab.Screen
        name="FiatList"
        component={FiatList}
        options={{ tabBarLabel: 'Fiat' }}
        initialParams={{ type }}
      />
      <Tab.Screen
        name="CryptoList"
        component={CryptoList}
        options={{ tabBarLabel: 'Crypto' }}
        initialParams={{ type }}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;
