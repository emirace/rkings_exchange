import { View } from 'react-native';
import React, { useState } from 'react';
import { Text, Button, Appbar, List, Modal, Dialog } from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveWidth } from '../../utils/size';
import { HomeScreenNavigationProp } from '../../type/navigation/stackNav';
import useAuth from '../../context/AuthContext';
import { HomeNavigationProp } from '../../type/navigation/bottomNav';

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [visible, setVisible] = useState(false);

  const handleLogout = async () => {
    await logout();
    onDismiss();
    navigation.navigate('Home');
  };

  const onDismiss = () => {
    setVisible(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Setting" />
      </Appbar.Header>
      <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
        <List.Section>
          <List.Subheader>General</List.Subheader>
          <List.Item
            title="Base currency"
            description="Select your prefered currency"
            titleStyle={{
              fontSize: getResponsiveFontSize(22),
            }}
            left={() => <List.Icon icon="currency-usd" />}
            descriptionStyle={{ fontSize: getResponsiveFontSize(18) }}
            right={() => <List.Icon icon="chevron-right" />}
            onPress={() => navigation.navigate('Currency')}
          />

          <List.Item
            title="Notification"
            description="Control your notification"
            titleStyle={{
              fontSize: getResponsiveFontSize(22),
            }}
            descriptionStyle={{ fontSize: getResponsiveFontSize(18) }}
            left={() => <List.Icon icon="bell-outline" />}
            right={() => <List.Icon icon="chevron-right" />}
            // onPress={() => navigation.navigate('Appearance')}
          />
        </List.Section>
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
            descriptionStyle={{ fontSize: getResponsiveFontSize(18) }}
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
            onPress={() => setVisible(true)}
          />
        )}
      </View>

      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to logout?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={handleLogout}>Logout</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default Settings;
