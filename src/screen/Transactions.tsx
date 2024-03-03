import { Animated, FlatList, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Appbar,
  Divider,
  Icon,
  IconButton,
  Searchbar,
  Text,
  useTheme,
} from 'react-native-paper';
import { TransactionsNavigationProp } from '../type/navigation/stackNav';
import { getResponsiveHeight, getResponsiveWidth } from '../utils/size';
import { useTransaction } from '../context/TransactionContext';
import { ITransaction } from '../type/transaction';
import moment from 'moment';
import { getCurrencySymbol } from '../utils/currency';
import { formatNumberWithCommasAndDecimals } from '../utils/helper';

const Transactions: React.FC<TransactionsNavigationProp> = ({ navigation }) => {
  const { colors } = useTheme();
  const { transactions, fetchUserTransactions, loading } = useTransaction();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  const _goBack = () => navigation.goBack();
  const renderItem = ({ item }: { item: ITransaction }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: getResponsiveHeight(20),
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Icon
              source={
                item.type !== 'debit'
                  ? 'arrow-down-bold-circle'
                  : 'arrow-up-bold-circle'
              }
              color={item.type === 'debit' ? 'red' : 'green'}
              size={35}
            />
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{ fontWeight: '600', marginBottom: 5, fontSize: 18 }}
              >
                {item.description}
              </Text>
              <Text style={{}}>
                {moment(item.createdAt).format('hh:mm a - dd  MMM yyyy')}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: '600', marginBottom: 5, fontSize: 18 }}>
              {getCurrencySymbol(item.currency)}
              {formatNumberWithCommasAndDecimals(item.amount, 4)}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                fontSize: 12,
                color:
                  item.status === 'COMPLETED'
                    ? 'green'
                    : item.status === 'PENDING'
                    ? 'orange'
                    : 'red',
              }}
            >
              {item.status}
            </Text>
          </View>
        </View>
        <Divider />
      </>
    );
  };
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Appbar.Header style={{ zIndex: 10 }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Transactions" />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: getResponsiveWidth(20),
          flex: 1,
        }}
      >
        <Animated.View
          style={[
            { flexDirection: 'row', position: 'absolute', left: 20 },
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [0, 50], // Adjust the range as needed
                    outputRange: [0, -90], // Adjust the translateY value as needed
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        >
          <Searchbar
            placeholder="Search transactions"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            style={{
              flex: 1,
              marginHorizontal: getResponsiveWidth(5),
            }}
          />
          <IconButton icon={'filter'} />
        </Animated.View>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, paddingTop: 60 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          />
        )}
      </View>
    </View>
  );
};

export default Transactions;
