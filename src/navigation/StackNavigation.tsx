import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainBottomNav from './bottom/MainBottomNav';
import Exchange from '../screen/Exchange';
import { RootStackParamList } from '../type/navigation';
import Buy from '../screen/buy';
import BuyForm from '../screen/buy/BuyForm';

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStackNav() {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
}

export default MainStackNav;
