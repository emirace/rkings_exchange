import { View } from 'react-native';
import React from 'react';
import { Appbar, List, useTheme } from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveWidth } from '../../utils/size';

const Settings: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
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
      </View>
    </View>
  );
};

export default Settings;
