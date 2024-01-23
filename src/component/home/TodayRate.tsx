import { View } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

const TodayRate = () => {
  return (
    <View style={{ marginTop: 30 }}>
      <Text variant="headlineMedium" style={{ fontWeight: '600' }}>
        Today's Rates
      </Text>
    </View>
  );
};

export default TodayRate;
