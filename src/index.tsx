import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import { View, Text } from 'react-native';
import React from 'react';
import useTheme from './context/ThemeContext';
import { darkTheme, lightTheme } from './constant/theme';
import MainBottomNav from './navigation/bottom/MainBottomNav';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Main = () => {
  const { themeMode } = useTheme();
  const paperTheme =
    themeMode === 'dark'
      ? { ...MD3DarkTheme, colors: darkTheme.colors }
      : { ...MD3LightTheme, colors: lightTheme.colors };
  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer
        theme={themeMode === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <MainBottomNav />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
