import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {
  Appbar,
  Text,
  Button,
  useTheme,
  ActivityIndicator,
  List,
  Divider,
  ProgressBar,
} from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { CryptoDetailNavigationProp } from '../type/navigation/stackNav';
import { formatNumberWithCommasAndDecimals } from '../utils/helper';
import { getCurrencySymbol } from '../utils/currency';
import { Wallet } from '../type/wallet';
import { useWallet } from '../context/WalletContext';
import { useCandles } from '../context/CandlesContext';
import axios from 'axios';

const WIDTH = Dimensions.get('screen').width;

const CryptoDetail: React.FC<CryptoDetailNavigationProp> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { systemWallets } = useWallet();
  const { crypto: cryptoId } = route.params;
  const [crypto, setCrypto] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [timeFrame, setTimeFrame] = useState('1m');
  const [price, setPrice] = useState<number | null>(null);
  const [dailyPercentage, setDailyPercentage] = useState<number | null>(null);
  const [high, setHigh] = useState<number | null>(null);
  const [low, setLow] = useState<number | null>(null);
  const [data, setData] = useState<number[]>([0]);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setLoading(true);

    const data = systemWallets.find((wal) => wal.name === cryptoId);
    console.log(cryptoId, data);
    if (data) {
      setCrypto(data);
    }
    setLoading(false);
  }, [cryptoId]);

  useEffect(() => {
    // Initialize WebSocket connection when the component mounts
    const initWebSocket = () => {
      if (!crypto) return;
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/ws/${crypto?.currency.toLowerCase()}usdt@ticker`
      );

      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        setPrice(parseFloat(eventData.c));
        setDailyPercentage(parseFloat(eventData.P));
        setHigh(parseFloat(eventData.h));
        setLow(parseFloat(eventData.l));
      };

      socket.onclose = () => {
        // Reconnect on close (implement a more sophisticated reconnection logic)
        setTimeout(initWebSocket, 1000);
      };

      socketRef.current = socket;
    };

    initWebSocket();

    return () => {
      // Close WebSocket connection when the component unmounts
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [crypto]);

  const fetchData = async () => {
    if (!crypto) return;
    try {
      setLoadingChart(true);
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines`,
        {
          params: {
            symbol: `${crypto?.currency}USDT`,
            interval: timeFrame,
            limit: 50,
          },
        }
      );

      const formattedData = response.data.map((item: number[]) => item[4]);

      setData(formattedData);
      setLoadingChart(false);
    } catch (error) {
      setLoadingChart(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [crypto, timeFrame]);

  const handleBuy = () => {
    navigation.navigate('BuyForm', { currency: crypto?.currency || '' });
  };

  const handleSell = () => {
    navigation.navigate('SellForm', { currency: crypto?.currency || '' });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background, flex: 1 },
      ]}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        {/* <Appbar.Content title="Exchange" /> */}
      </Appbar.Header>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      ) : !crypto ? (
        <Text>Crypto data not found</Text>
      ) : (
        <ScrollView>
          <View style={{ padding: getResponsiveWidth(20) }}>
            <Text style={styles.subtitle}>{crypto.currency}</Text>
            <Text style={styles.title}>{crypto.name}</Text>
            <Text style={styles.title}>
              {getCurrencySymbol(crypto.currency)}
              {formatNumberWithCommasAndDecimals(price || 0)}
            </Text>
            {!dailyPercentage ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.percentChange}>
                {dailyPercentage > 0 ? '+' : ''}
                {formatNumberWithCommasAndDecimals(dailyPercentage)}%
              </Text>
            )}
          </View>
          <View style={{ marginLeft: getResponsiveWidth(-60) }}>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: data,
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
            <ProgressBar
              indeterminate
              visible={loadingChart}
              color={colors.primary}
            />
          </View>
          <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
            <View style={styles.optionsContainer}>
              {['1m', '1h', '1d', '1w', '1M'].map((t) => (
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
            <Divider style={{ marginVertical: getResponsiveHeight(20) }} />

            <List.Item
              title="Deposit"
              description={`Receive crypto to your ${crypto.currency} wallet`}
              titleStyle={{
                fontSize: getResponsiveFontSize(22),
                // color: colors.primary,
                fontWeight: '600',
              }}
              descriptionStyle={{ fontSize: getResponsiveFontSize(18) }}
              left={() => (
                <List.Icon
                  icon="arrow-down-bold-circle"
                  color={colors.primary}
                />
              )}
              right={() => <List.Icon icon="chevron-right" />}
              onPress={() => navigation.navigate('Deposit')}
            />

            <List.Item
              title="Transaction"
              description={`View your order history`}
              titleStyle={{
                fontSize: getResponsiveFontSize(22),
                // color: colors.primary,
                fontWeight: '600',
              }}
              descriptionStyle={{ fontSize: getResponsiveFontSize(18) }}
              left={() => <List.Icon icon="chart-bar" color={colors.primary} />}
              right={() => <List.Icon icon="chevron-right" />}
              // onPress={() => navigation.navigate('Deposit')}
            />
          </View>
        </ScrollView>
      )}
      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          contentStyle={{ height: 50 }}
          labelStyle={{ fontWeight: '800' }}
          uppercase
          style={{
            borderRadius: 5,
            flex: 1,
          }}
          onPress={handleSell}
        >
          SELL
        </Button>
        <Button
          onPress={handleBuy}
          mode="contained"
          contentStyle={{ height: 50 }}
          labelStyle={{ fontWeight: '800' }}
          uppercase
          style={{
            borderRadius: 5,
            flex: 1,
          }}
        >
          BUY
        </Button>
      </View>
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
    marginBottom: getResponsiveHeight(15),
  },
  subtitle: {
    fontSize: getResponsiveFontSize(18),
    marginBottom: getResponsiveHeight(10),
  },
  percentChange: {
    fontSize: 20,
    color: '#009688',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    padding: getResponsiveHeight(20),
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
