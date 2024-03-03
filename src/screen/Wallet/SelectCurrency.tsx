import { View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import TopNavigation from '../../navigation/TopNavigation';
import { SelectCurrencyNavigationProp } from '../../type/navigation/stackNav';
import LoginModal from '../../component/auth/LoginModal';

const SelectCurrency: React.FC<SelectCurrencyNavigationProp> = ({
  navigation,
  route,
}) => {
  const _goBack = () => navigation.goBack();
  const { type } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Choose Currency" />
      </Appbar.Header>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TopNavigation type={type} />
      </View>
      <LoginModal navigation={navigation} />
    </View>
  );
};

export default SelectCurrency;
