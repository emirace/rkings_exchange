import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Appbar, Text, Button, useTheme } from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { CryptoDetailNavigationProp } from '../type/navigation/stackNav';

interface CryptoData {
  name: string;
  currency: string;
  percentChange: number;
  history: number[];
}

const sampleCryptoData: CryptoData = {
  name: 'Bitcoin',
  currency: 'USD',
  percentChange: 2.5,
  history: [50, 45, 55, 60, 52, 48],
};

const WIDTH = Dimensions.get('screen').width;

const CryptoDetail: React.FC<CryptoDetailNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { crypto: cryptoId } = route.params;
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null);
  const [timeFrame, setTimeFrame] = useState('1h');

  useEffect(() => {
    // Replace this with your actual data fetching logic
    // For now, using sample data
    setCryptoData(sampleCryptoData);
  }, [cryptoId]);

  const handleBuy = () => {
    // Implement buy logic
    console.log('Buy button pressed');
  };

  const handleSell = () => {
    // Implement sell logic
    console.log('Sell button pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {/* <Appbar.Content title="Exchange" /> */}
      </Appbar.Header>
      {cryptoData ? (
        <>
          <View style={{ padding: getResponsiveWidth(20) }}>
            <Text style={styles.subtitle}>{cryptoData.currency}</Text>
            <Text style={styles.title}>{cryptoData.name}</Text>
            <Text style={styles.title}>$3625526</Text>
            <Text style={styles.percentChange}>
              {cryptoData.percentChange > 0 ? '+' : ''}
              {cryptoData.percentChange.toFixed(2)}%
            </Text>
          </View>
          <View style={{ marginLeft: getResponsiveWidth(-60) }}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: cryptoData.history,
                  },
                ],
              }}
              width={getResponsiveWidth(WIDTH + 140)}
              height={getResponsiveHeight(300)}
              withVerticalLabels={false}
              withHorizontalLabels={false}
              withInnerLines={false}
              withOuterLines={false}
              withDots={false}
              bezier
              chartConfig={{
                backgroundGradientFrom: colors.background,
                backgroundGradientTo: colors.background,
                color: (opacity = 1) => colors.primary,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color
                style: {
                  borderRadius: 16,
                },
              }}
            />
          </View>
          <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
            <View style={styles.optionsContainer}>
              {['1h', '1d', '1w', '1m', '1y'].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTimeFrame(t)}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: colors.elevation.level3,
                      borderWidth: 1,
                      borderColor:
                        timeFrame === t ? colors.primary : colors.backdrop,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      timeFrame === t && { color: colors.primary },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={handleBuy}>
                SELL
              </Button>
              <Button mode="contained" onPress={handleSell}>
                BUY
              </Button>
            </View>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: getResponsiveFontSize(32),
    fontWeight: '600',
    marginBottom: getResponsiveHeight(20),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(18),
    marginBottom: getResponsiveHeight(16),
  },
  percentChange: {
    fontSize: 20,
    color: '#009688',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },

  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    height: getResponsiveHeight(45),
    width: getResponsiveWidth(45),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    position: 'relative',
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CryptoDetail;
