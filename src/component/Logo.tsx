import { View, Text, Image } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';

interface Props {
  text?: boolean;
}

const Logo: React.FC<Props> = ({ text = true }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
      <Image
        source={{ uri: 'https://rkingsexchange.com/images/logo_red.PNG' }}
        style={{
          width: getResponsiveWidth(40),
          height: getResponsiveHeight(40),
          objectFit: 'contain',
        }}
        alt="logo"
      />
      {text && (
        <Text
          style={{
            fontSize: getResponsiveFontSize(25),
            fontWeight: '800',
            color: colors.primary,
          }}
        >
          Kings Exchange
        </Text>
      )}
    </View>
  );
};

export default Logo;
