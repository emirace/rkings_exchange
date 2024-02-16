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
import { DepositProvider } from './context/DepositContext';
import { PageProvider } from './context/PageContext';
import { OrderProvider } from './context/OrderContext';
import { WalletProvider } from './context/WalletContext';
import { WithdrawProvider } from './context/WithdrawContext';
import { ProductProvider } from './context/ProductContext';
import { ToastNotificationProvider } from './context/ToastNotificationContext';
import { CartProvider } from './context/CartContext';
import { StatusBar } from 'expo-status-bar';
import { CandlesProvider } from './context/CandlesContext';

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
      <StatusBar
        animated={true}
        style={themeMode === 'dark' ? 'light' : 'dark'}
      />
      <NavigationContainer
        theme={themeMode === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme}
      >
        <ToastNotificationProvider>
          <AuthProvider>
            <SwapProvider>
              <DepositProvider>
                <PageProvider>
                  <OrderProvider>
                    <WalletProvider>
                      <WithdrawProvider>
                        <ProductProvider>
                          <CartProvider>
                            <BottomSheetModalProvider>
                              <CandlesProvider>
                                <MainStackNav />
                              </CandlesProvider>
                            </BottomSheetModalProvider>
                          </CartProvider>
                        </ProductProvider>
                      </WithdrawProvider>
                    </WalletProvider>
                  </OrderProvider>
                </PageProvider>
              </DepositProvider>
            </SwapProvider>
          </AuthProvider>
        </ToastNotificationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
