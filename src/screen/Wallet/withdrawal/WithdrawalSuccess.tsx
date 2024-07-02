import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

const WithdrawalSuccess: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Icon source={'check-circle'} size={100} color="#2ecc71" />
      <Text style={styles.title}>Withdrawal Successful!</Text>
      <Text style={styles.details}>
        You have successfully made a withdrawal
      </Text>

      <Button
        mode="contained"
        style={styles.homeButton}
        onPress={() => navigation.replace('HomeMain')}
      >
        Go to Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2ecc71',
  },
  details: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  homeButton: {
    marginTop: 20,
  },
});

export default WithdrawalSuccess;
