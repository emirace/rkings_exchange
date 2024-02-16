import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../utils/size';
import { useOrder } from '../context/OrderContext';
import {
  BottomSheetScrollView,
  useBottomSheetInternal,
} from '@gorhom/bottom-sheet';

interface Props {
  onClose: () => void;
}

const DeliveryInfo: React.FC<Props> = ({ onClose }) => {
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const { shippingInfo, updateShippingInfo } = useOrder();

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  const handleProceedToPayment = () => {
    // Validate the input fields, and proceed to the payment screen if valid
    if (
      shippingInfo.fullName &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.zipCode &&
      shippingInfo.phone
    ) {
      // You can navigate to the payment screen or perform other actions
      onClose();
    } else {
      // Show an error message or handle invalid input
      alert('Please fill in all the fields');
    }
  };

  return (
    <BottomSheetScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Delivery Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={shippingInfo.fullName}
          onChangeText={(e) => updateShippingInfo('fullName', e)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={shippingInfo.address}
          onChangeText={(e) => updateShippingInfo('address', e)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={shippingInfo.city}
          onChangeText={(e) => updateShippingInfo('city', e)}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <TextInput
          style={styles.input}
          placeholder="ZIP Code"
          value={shippingInfo.zipCode}
          onChangeText={(e) => updateShippingInfo('zipCode', e)}
          keyboardType="numeric"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={shippingInfo.phone}
          onChangeText={(e) => updateShippingInfo('phone', e)}
          keyboardType="phone-pad"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
        />
      </View>
      <Button
        mode="contained"
        style={styles.proceedButton}
        onPress={handleProceedToPayment}
        uppercase
        contentStyle={{ height: getResponsiveHeight(50) }}
        labelStyle={{ fontWeight: '800' }}
      >
        Proceed to Payment
      </Button>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: getResponsiveWidth(20),
    // justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: getResponsiveFontSize(24),
    fontWeight: 'bold',
    marginBottom: getResponsiveHeight(16),
  },
  input: {
    // height: 40,
    marginBottom: getResponsiveHeight(20),
    paddingHorizontal: getResponsiveHeight(10),
  },
  proceedButton: {
    marginVertical: getResponsiveHeight(30),
    borderRadius: 5,
  },
});

export default DeliveryInfo;
