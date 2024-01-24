// MainBottomNav.tsx
import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';
import Home from '../../screen/Home';
import Store from '../../screen/Store';
import Wallet from '../../screen/Wallet';
import Settings from '../../screen/Settings';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { lightTheme } from '../../constant/theme';
import CustomTabBarButton from '../../component/CustomTabBarButton';
import BottomNavBar from '../../component/BottomSheetContent/BottomNavBar';
import { useTheme } from 'react-native-paper';
import { getResponsiveHeight, getResponsiveWidth } from '../../utils/size';

type TabConfiguration = {
  name: string;
  component: React.ComponentType<any>;
  iconSource: string;
  badge?: number;
  floatingButton?: boolean;
};

const Tab = createBottomTabNavigator();

const tabBarStyle: StyleProp<ViewStyle> = {
  elevation: 0,
  shadowOpacity: 0,
  position: 'absolute',
  borderTopWidth: 0,
  bottom: getResponsiveHeight(25),
  left: getResponsiveWidth(20),
  right: getResponsiveWidth(20),
  borderRadius: 20,
  height: getResponsiveHeight(90),
  paddingTop: getResponsiveHeight(Platform.OS === 'ios' ? 30 : 0),
};

const tabBarShadowStyle: StyleProp<ViewStyle> = {
  shadowColor: lightTheme.colors.secondary,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 3.5,
  elevation: 5,
};

const tabBarBadgeStyle: StyleProp<ViewStyle> = {
  position: 'absolute',
  top: Platform.OS === 'android' ? 10 : -10,
  right: -5,
  backgroundColor: lightTheme.colors.primary,
};

const tabConfigurations: TabConfiguration[] = [
  {
    name: 'Home',
    component: Home,
    iconSource: 'home',
  },
  {
    name: 'Store',
    component: Store,
    iconSource: 'store',
    badge: 3,
  },
  {
    name: 'FloatingButton',
    component: Home,
    iconSource: 'plus',
    floatingButton: true,
  },
  {
    name: 'Wallet',
    component: Wallet,
    iconSource: 'wallet',
  },
  {
    name: 'Setting',
    component: Settings,
    iconSource: 'cog',
  },
];

const MainBottomNav: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { colors } = useTheme();

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: lightTheme.colors.primary,
          tabBarStyle: { ...tabBarStyle, ...tabBarShadowStyle },
          tabBarShowLabel: false,
          tabBarBadgeStyle: tabBarBadgeStyle,
          headerShown: false,
        }}
      >
        {tabConfigurations.map((config) => (
          <Tab.Screen
            key={config.name}
            name={config.name}
            component={config.component}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  source={
                    focused ? config.iconSource : `${config.iconSource}-outline`
                  }
                  color={color}
                  size={getResponsiveHeight(30)}
                />
              ),
              tabBarBadge: config.badge,
              tabBarButton: config.floatingButton
                ? () => <CustomTabBarButton onPress={openBottomSheet} />
                : undefined,
            }}
          />
        ))}
      </Tab.Navigator>

      {/* Bottom Sheet */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        // style={{ ...tabBarShadowStyle }}
        handleIndicatorStyle={{
          backgroundColor: lightTheme.colors.primary,
        }}
      >
        <BottomNavBar />
      </BottomSheetModal>
    </View>
  );
};

export default MainBottomNav;
