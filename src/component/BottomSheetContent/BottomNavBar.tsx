import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { Divider, Icon, Text, useTheme } from 'react-native-paper';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';

interface BottomNavbarProps extends HomeScreenNavigationProp {
  onClose: () => void;
}

const BottomNavBar: React.FC<BottomNavbarProps> = ({ navigation, onClose }) => {
  const { colors } = useTheme();

  const handleNavigation = (
    screen: 'Buy' | 'Sell' | 'Exchange' | 'SelectCurrency'
  ) => {
    if (screen === 'SelectCurrency') {
      navigation.navigate('SelectCurrency', { type: 'Deposit' });
    } else {
      navigation.navigate(screen);
    }
    onClose();
  };

  const renderNavItem = (
    screen: 'Buy' | 'Sell' | 'Exchange' | 'SelectCurrency',
    icon: string,
    title: string,
    description: string
  ) => (
    <TouchableOpacity
      style={styles.navItemContainer}
      onPress={() => handleNavigation(screen)}
    >
      <Icon size={30} color={colors.primary} source={icon} />
      <View style={styles.navItemText}>
        <Text
          variant="displaySmall"
          style={{
            fontSize: getResponsiveFontSize(25),
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
        <Text style={{ opacity: 0.5 }}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderNavItem('Buy', 'plus-circle', 'Buy', 'Buy crypto')}
      <Divider style={styles.divider} />
      {renderNavItem('Sell', 'minus-circle', 'Sell', 'Sell crypto')}
      <Divider style={styles.divider} />
      {renderNavItem(
        'Exchange',
        'plus-circle',
        'Exchange',
        'Exchange one crypto for another'
      )}
      <Divider style={styles.divider} />
      {renderNavItem(
        'SelectCurrency',
        'plus-circle',
        'Deposit',
        'Fund your wallet'
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: getResponsiveHeight(20),
  },
  navItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: getResponsiveHeight(20),
  },
  navItemText: {
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
});

export default BottomNavBar;
