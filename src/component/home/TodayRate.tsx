import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Avatar, Text, useTheme } from 'react-native-paper';
import { getResponsiveFontSize, getResponsiveHeight } from '../../utils/size';

export interface CurrencyData {
  id: string;
  icon: string;
  name: string;
  currency: string;
  rate: number;
  percentageChange: number;
}

const TodayRate: React.FC = () => {
  const { colors } = useTheme();

  const data: CurrencyData[] = [
    {
      id: '1',
      icon: 'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg',
      name: 'USD',
      currency: 'US Dollar',
      rate: 1.25,
      percentageChange: -0.5,
    },
    {
      id: '2',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/255px-Flag_of_Europe.svg.png',
      name: 'EUR',
      currency: 'Euro',
      rate: 1.18,
      percentageChange: 0.8,
    },
    {
      id: '3',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2560px-Flag_of_the_United_Kingdom.svg.png',
      name: 'GBP',
      currency: 'British Pound',
      rate: 1.36,
      percentageChange: -1.2,
    },
    {
      id: '4',
      icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/1280px-Flag_of_Japan.svg.png',
      name: 'JPY',
      currency: 'Japanese Yen',
      rate: 130.2,
      percentageChange: 0.3,
    },
    // Add more data as needed
  ];

  // Function to render each item in the flat list
  const renderItem = ({ item }: { item: CurrencyData }) => (
    <Card
      style={styles.card}
      elevation={0}
      contentStyle={{
        backgroundColor: colors.elevation.level1,
        borderRadius: 20,
      }}
    >
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar.Image size={45} source={{ uri: item.icon }} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyFullName}>{item.currency}</Text>
            <Text style={styles.currencyName}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.rateContainer}>
          <Text style={styles.currencyRate}>{item.rate}</Text>
          <Text
            style={[
              styles.percentageChange,
              { color: item.percentageChange < 0 ? 'red' : 'green' },
            ]}
          >
            {item.percentageChange > 0 ? '+' : ''}
            {item.percentageChange}%
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text
        variant="headlineMedium"
        style={[styles.headerText, { fontSize: getResponsiveFontSize(28) }]}
      >
        Today's Rates
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: getResponsiveHeight(30),
    flex: 1,
  },
  headerText: {
    fontWeight: '600',
  },
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

export default TodayRate;
