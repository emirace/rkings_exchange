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
import React from 'react';
import useTheme from './context/ThemeContext';
import { darkTheme, lightTheme } from './constant/theme';
import MainStackNav from './navigation/StackNavigation';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SwapProvider } from './context/SwapContext';
import { AuthProvider } from './context/AuthContext';

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
        <AuthProvider>
          <SwapProvider>
            <BottomSheetModalProvider>
              <MainStackNav />
            </BottomSheetModalProvider>
          </SwapProvider>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
