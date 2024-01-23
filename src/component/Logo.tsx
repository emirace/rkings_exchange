import { View, Text, Image } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const Logo = () => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Image
        source={{ uri: 'https://rkingsexchange.com/images/logo_red.PNG' }}
        style={{ width: 40, height: 40, objectFit: 'contain' }}
        alt="logo"
      />
      <Text style={{ fontSize: 25, fontWeight: '800', color: colors.primary }}>
        Kings Exchange
      </Text>
    </View>
  );
};

export default Logo;
