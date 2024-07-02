import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Text, useTheme, ActivityIndicator } from 'react-native-paper';

const messages = ['Funding in progress', 'Please wait', 'Almost there'];

interface Props {
  loading: boolean;
}
const LoadingText: React.FC<Props> = ({ loading }) => {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Modal
      visible={loading}
      // onDismiss={}
      contentContainerStyle={[
        {
          backgroundColor: colors.background,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          margin: 20,
          borderRadius: 10,
        },
      ]}
    >
      <View style={styles.container}>
        <ActivityIndicator />
        <Text style={styles.text}>
          {messages[index].split('').map((char, charIndex) => (
            <Text key={charIndex} style={[styles.typingText]}>
              {char}
            </Text>
          ))}
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginTop: 5,
  },
  typingText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default LoadingText;
