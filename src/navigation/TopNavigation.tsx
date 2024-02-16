import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CryptoList from '../component/deposit/CryptoList';
import FiatList from '../component/deposit/FiatList';
import { RootTopParamList } from '../type/navigation/topNav';
import { useTheme } from 'react-native-paper';

const Tab = createMaterialTopTabNavigator<RootTopParamList>();

function TopNavigation() {
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
          maxWidth: '50%',
          marginLeft: '9.3%',
          height: 3,
          borderRadius: 5,
        },
      }}
    >
      <Tab.Screen
        name="FiatList"
        component={FiatList}
        options={{ tabBarLabel: 'Fiat' }}
      />
      <Tab.Screen
        name="CryptoList"
        component={CryptoList}
        options={{ tabBarLabel: 'Crypto' }}
      />
    </Tab.Navigator>
  );
}

export default TopNavigation;
