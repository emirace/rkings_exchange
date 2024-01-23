import { View } from 'react-native';
import React, { useState } from 'react';
import { Menu, Divider, Text, Button, Appbar } from 'react-native-paper';
import useTheme from '../context/ThemeContext';
import Logo from '../component/Logo';

const Settings = () => {
  const [visible, setvisible] = useState(false);
  const { toggleTheme } = useTheme();

  const handleOnpress = (value: 'system' | 'dark' | 'light') => {
    toggleTheme(value);
    setvisible(false);
  };
  return (
    <View>
      <Appbar.Header>
        <Logo />
      </Appbar.Header>

      <Menu
        visible={visible}
        onDismiss={() => setvisible(false)}
        anchor={<Button onPress={() => setvisible(true)}>Show menu</Button>}
      >
        <Menu.Item onPress={() => handleOnpress('system')} title="System" />
        <Menu.Item onPress={() => handleOnpress('light')} title="Light" />
        <Divider />
        <Menu.Item onPress={() => handleOnpress('dark')} title="Dark" />
      </Menu>
    </View>
  );
};

export default Settings;
