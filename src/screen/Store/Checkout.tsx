import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Appbar, Icon, List, Text, useTheme } from 'react-native-paper';
import { CheckoutNavigationProp } from '../../type/navigation/stackNav';
import PaymentMethod from '../../component/PaymentMethod';
import {
  getResponsiveFontSize,
  getResponsiveHeight,
  getResponsiveWidth,
} from '../../utils/size';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../../component/CustomBackdrop';
import DeliveryInfo from '../../component/DeliveryInfo';
import { useOrder } from '../../context/OrderContext';

const Checkout: React.FC<CheckoutNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();
  const { shippingInfo } = useOrder();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isShipping, setIsShipping] = useState(false);

  useEffect(() => {
    if (
      shippingInfo.fullName &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.zipCode &&
      shippingInfo.phone
    ) {
      setIsShipping(true);
    } else {
      setIsShipping(false);
    }
  }, [shippingInfo]);

  const openBottomSheet = () => {
    if (bottomSheetModalRef.current) {
      bottomSheetModalRef.current.present();
    }
  };
  const onApprove = () => {};
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ marginBottom: getResponsiveHeight(20) }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Checkout" />
      </Appbar.Header>
      <View style={{ flex: 1, gap: 20 }}>
        <View style={{ paddingHorizontal: getResponsiveWidth(20) }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: getResponsiveHeight(20),
            }}
          >
            <Text
              variant="headlineSmall"
              style={{
                fontWeight: 'bold',
              }}
            >
              Shipping Information
            </Text>
            {isShipping && (
              <Text
                onPress={openBottomSheet}
                style={{ color: colors.primary, fontWeight: '700' }}
              >
                Change
              </Text>
            )}
          </View>

          {isShipping ? (
            <View
              style={{
                gap: 10,
                backgroundColor: colors.elevation.level1,
                padding: getResponsiveHeight(20),
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: getResponsiveWidth(10),
                  marginHorizontal: getResponsiveWidth(10),
                }}
              >
                <Icon source={'account-outline'} size={20} />
                <Text style={{ fontSize: getResponsiveFontSize(20) }}>
                  {shippingInfo.fullName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: getResponsiveWidth(10),
                  marginHorizontal: getResponsiveWidth(10),
                }}
              >
                <Icon source={'home-outline'} size={20} />

                <Text style={{ fontSize: getResponsiveFontSize(20) }}>
                  {shippingInfo.address}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: getResponsiveWidth(10),
                  marginHorizontal: getResponsiveWidth(10),
                }}
              >
                <Icon source={'city'} size={20} />

                <Text style={{ fontSize: getResponsiveFontSize(20) }}>
                  {shippingInfo.city}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: getResponsiveWidth(10),
                  marginHorizontal: getResponsiveWidth(10),
                }}
              >
                <Icon source={'map-marker'} size={20} />

                <Text style={{ fontSize: getResponsiveFontSize(20) }}>
                  {shippingInfo.zipCode}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: getResponsiveWidth(10),
                  marginHorizontal: getResponsiveWidth(10),
                }}
              >
                <Icon source={'phone-outline'} size={20} />

                <Text style={{ fontSize: getResponsiveFontSize(20) }}>
                  {shippingInfo.phone}
                </Text>
              </View>
            </View>
          ) : (
            <List.Item
              title="Enter Shipping Address"
              description="click to enter or select your prefer delivery location"
              titleStyle={{ fontWeight: '600' }}
              left={(props) => <List.Icon {...props} icon="map-marker" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={openBottomSheet}
              descriptionStyle={{ color: colors.primary }}
            />
          )}
        </View>
        <PaymentMethod amount={200} currency="USD" onApprove={onApprove} />
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['90%']}
        backgroundStyle={{
          backgroundColor: colors.elevation.level1,
        }}
        handleIndicatorStyle={{
          backgroundColor: colors.primary,
        }}
        backdropComponent={(props) => <CustomBackdrop {...props} />}
      >
        <DeliveryInfo onClose={() => bottomSheetModalRef.current?.close()} />
      </BottomSheetModal>
    </View>
  );
};

export default Checkout;
