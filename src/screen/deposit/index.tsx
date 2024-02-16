import { View } from 'react-native';
import React from 'react';
import { Appbar } from 'react-native-paper';
import TopNavigation from '../../navigation/TopNavigation';
import { DepositNavigationProp } from '../../type/navigation/stackNav';

const Deposit: React.FC<DepositNavigationProp> = ({ navigation }) => {
  const _goBack = () => navigation.goBack();

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Choose Currency" />
      </Appbar.Header>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <TopNavigation />
      </View>
    </View>
  );
};

export default Deposit;
