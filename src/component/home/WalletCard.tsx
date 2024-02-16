import { View } from 'react-native';
import React, { useState } from 'react';
import { Button, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';
import useAuth from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { getCurrencySymbol } from '../../utils/currency';
import { formatNumberWithCommasAndDecimals } from '../../utils/helper';

const WalletCard: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { totalBalance, baseCurrency } = useWallet();
  const [show, setShow] = useState(true);

  const handleCardPress = (value: 'Buy' | 'Sell') => {
    navigation.navigate(value);
  };
  return user ? (
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text
              //   variant="titleLarge"
              style={{
                color: colors.onPrimary,
                fontSize: getResponsiveFontSize(22),
              }}
            >
              Current Balance
            </Text>
            <IconButton
              icon={show ? 'eye-off' : 'eye'}
              size={20}
              iconColor="white"
              onPress={() => setShow(!show)}
            />
          </View>
          <Text
            //   variant="displayMedium"
            style={{
              color: colors.onPrimary,
              fontWeight: '600',
              fontSize: getResponsiveFontSize(45),
            }}
          >
            {show ? (
              <Text
                style={{
                  color: colors.onPrimary,
                  fontWeight: '600',
                  fontSize: getResponsiveFontSize(45),
                }}
              >
                {getCurrencySymbol(baseCurrency.currency, {
                  color: colors.onPrimary,
                })}
                {formatNumberWithCommasAndDecimals(totalBalance)}
              </Text>
            ) : (
              'xxxx'
            )}
          </Text>
        </View>
        <IconButton
          icon={'chevron-right'}
          size={30}
          iconColor="white"
          onPress={() => navigation.navigate('Wallet')}
        />
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
              fontWeight: '800',
            }}
            onPress={() => handleCardPress('Buy')}
            uppercase
          >
            Buy
          </Button>
          <Button
            mode="contained"
            buttonColor={colors.onPrimary}
            textColor={colors.primary}
            uppercase
            labelStyle={{
              fontWeight: '800',
            }}
            onPress={() => handleCardPress('Sell')}
          >
            Sell
          </Button>
        </View>
      </View>
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={[colors.primary, 'black']}
      start={{ x: 0.3, y: 0.5 }}
      style={{
        backgroundColor: colors.primary,
        height: getResponsiveHeight(150),
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <View>
          <Text
            style={{
              color: colors.onPrimary,
              fontWeight: '600',
              fontSize: getResponsiveFontSize(30),
            }}
          >
            Start your journey
          </Text>
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: getResponsiveFontSize(18),
            }}
          >
            Unlock a world of possibilities with{' '}
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Rkings Exchange
            </Text>
            .
          </Text>
          <Text
            style={{
              color: colors.onPrimary,
              fontSize: getResponsiveFontSize(18),
              marginTop: 5,
            }}
          >
            Log in to begin
          </Text>
        </View>
        <IconButton
          icon={'login'}
          size={30}
          iconColor="white"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </LinearGradient>
  );
};

export default WalletCard;
