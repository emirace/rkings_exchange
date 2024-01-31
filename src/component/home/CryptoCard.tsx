import { View, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Text, Card, Avatar, ActivityIndicator } from 'react-native-paper';
import { Wallet } from '../../type/wallet';

export interface PriceData {
  c: string;
  P: string;
}

const CryptoCard: React.FC<{ item: Wallet; navigation: any }> = ({
  item,
  navigation,
}) => {
  const [priceData, setPriceData] = useState<PriceData>({ c: '0', P: '0' });
  const [prePriceData, setPrePriceData] = useState<PriceData>({
    c: '0',
    P: '0',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/${item.currency.toLowerCase()}usdt@ticker`
    );

    ws.onmessage = (data) => {
      if (data) {
        const trade = JSON.parse(data.data);
        setPriceData((prev) => {
          setPrePriceData(prev);
          setIsLoading(false); // Data received, set loading to false
          return trade;
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [item.currency]);

  const priceChange = parseFloat(priceData.c) - parseFloat(prePriceData.c);
  const isPriceIncreased = priceChange > 0;

  return (
    <Card
      style={styles.card}
      mode="contained"
      onPress={() => navigation.navigate('CryptoDetail', { crypto: item.name })}
    >
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image
            size={45}
            source={{ uri: 'https://rkingsexchange.com' + item.image }}
          />
          <View style={styles.textContainer}>
            <Text style={styles.currencyFullName}>{item.currency}</Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.rateContainer}>
            <Text style={styles.currencyRate}>{priceData.c}</Text>
            <Text
              style={[
                styles.percentageChange,
                { color: isPriceIncreased ? 'red' : 'green' },
              ]}
            >
              {isPriceIncreased ? '+' : ''}
              {priceChange}%
            </Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    marginLeft: 15,
  },
  currencyName: {
    color: 'gray',
  },
  currencyFullName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  rateContainer: {
    alignItems: 'flex-end',
  },
  currencyRate: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  percentageChange: {
    fontSize: 14,
  },
});

export default CryptoCard;
