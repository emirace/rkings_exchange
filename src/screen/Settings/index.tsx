import { View } from 'react-native';
import React, { useState } from 'react';
import { Menu, Divider, Text, Button, Appbar, List } from 'react-native-paper';
import useTheme from '../../context/ThemeContext';
import Logo from '../../component/Logo';
import { getResponsiveFontSize, getResponsiveWidth } from '../../utils/size';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';
import useAuth from '../../context/AuthContext';

const Settings: React.FC<HomeScreenNavigationProp> = ({ navigation }) => {
  const { user, logout } = useAuth();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Setting" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Theme"
            description="Select your prefered theme"
            titleStyle={{
              fontSize: getResponsiveFontSize(22),
            }}
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => navigation.navigate('Appearance')}
          />
        </List.Section>
        {user && (
          <List.Item
            title="Log out"
            titleStyle={{
              fontSize: getResponsiveFontSize(22),
            }}
            left={() => <List.Icon icon="logout" />}
            onPress={() => logout()}
          />
        )}
      </View>
    </View>
  );
};

export default Settings;
