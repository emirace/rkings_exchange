import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomNav from './bottom/MainBottomNav';
import Exchange from '../screen/Exchange';
import Buy from '../screen/buy';
import BuyForm from '../screen/buy/BuyForm';
import Sell from '../screen/sell';
import SellForm from '../screen/sell/SellForm';
import { RootStackParamList } from '../type/navigation/stackNav';
import DepositFiatForm from '../screen/Wallet/deposit/DepositFiatForm';
import DepositCryptoForm from '../screen/Wallet/deposit/DepositCryptoForm';
import DepositAddress from '../screen/Wallet/deposit/DepositAddress';
import ProductDetail from '../screen/Store/ProductDetail';
import Search from '../screen/Store/Search';
import Cart from '../screen/Store/Cart';
import Checkout from '../screen/Store/Checkout';
import CryptoDetail from '../screen/CryptoDetail';
import Appearance from '../screen/Settings/Appearance';
import Auth from '../screen/Auth';
import ToastNotification from '../component/ToastNotification';
import Currency from '../screen/Settings/Currency';
import Profile from '../screen/Profile';
import WithdrawalFiatForm from '../screen/Wallet/withdrawal/WithdrawalFiatForm';
import WithdrawalCryptoForm from '../screen/Wallet/withdrawal/WithdrawalCryptoForm';
import SelectCurrency from '../screen/Wallet/SelectCurrency';
import WithdrawalSuccess from '../screen/Wallet/withdrawal/WithdrawalSuccess';
import Transactions from '../screen/Transactions';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStackNav() {
  return (
    <>
      <ToastNotification />
      <Stack.Navigator initialRouteName={'Auth'}>
        <Stack.Screen
          name="HomeMain"
          component={MainBottomNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Exchange"
          component={Exchange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Buy"
          component={Buy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuyForm"
          component={BuyForm}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Sell"
          component={Sell}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SellForm"
          component={SellForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectCurrency"
          component={SelectCurrency}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepositFiatForm"
          component={DepositFiatForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepositCryptoForm"
          component={DepositCryptoForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WithdrawalFiatForm"
          component={WithdrawalFiatForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WithdrawalCryptoForm"
          component={WithdrawalCryptoForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepositAddress"
          component={DepositAddress}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CryptoDetail"
          component={CryptoDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Appearance"
          component={Appearance}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Currency"
          component={Currency}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WithdrawalSuccess"
          component={WithdrawalSuccess}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export default MainStackNav;
