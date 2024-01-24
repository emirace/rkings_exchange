import { View } from 'react-native';
import React from 'react';
import { Button, Icon, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import { HomeScreenNavigationProp } from '../../type/navigation';

const WalletCard: React.FC<HomeScreenNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();
  const handleCardPress = () => {
    navigation.navigate('Buy');
  };
  return (
    <LinearGradient
      colors={[colors.primary, 'black']}
      start={{ x: 0.3, y: 0.5 }}
      style={{
        backgroundColor: colors.primary,
        height: getResponsiveHeight(250),
        borderRadius: 30,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
        padding: 20,
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text
          //   variant="titleLarge"
          style={{
            color: colors.onPrimary,
            fontSize: getResponsiveFontSize(22),
          }}
        >
          Current Balance
        </Text>
        <Text
          //   variant="displayMedium"
          style={{
            color: colors.onPrimary,
            fontWeight: '600',
            fontSize: getResponsiveFontSize(45),
          }}
        >
          $21983890.00
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Icon size={20} source="chart-bar" color={colors.onPrimary} />
          <Text
            variant="titleLarge"
            style={{
              color: colors.onPrimary,
              fontSize: getResponsiveFontSize(22),
            }}
          >
            Transactions
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <Button
            mode="contained"
            buttonColor={colors.onPrimary}
            textColor={colors.primary}
            labelStyle={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(20),
            }}
            rippleColor={colors.primaryContainer}
            onPress={handleCardPress}
          >
            Buy
          </Button>
          <Button
            mode="contained"
            buttonColor={colors.onPrimary}
            textColor={colors.primary}
            labelStyle={{
              fontWeight: '600',
              fontSize: getResponsiveFontSize(20),
            }}
          >
            Sell
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WalletCard;
