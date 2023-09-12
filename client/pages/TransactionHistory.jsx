import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TransactionList from '../components/TransactionList';
import { getTransactionList } from '../services/apis/transactionHistoryAPI';

const TransactionHistory = props => {
  const [transactionsByDate, setTransactionsByDate] = useState(new Map()); // 순서를 지켜주기 위해서 Map 객체를 사용

  const setData = async () => {
    const result = await getTransactionList();

    const classifiedData = new Map();
    result.forEach(item => {
      if (classifiedData.get(item['거래일자']) === undefined) {
        classifiedData.set(item['거래일자'], []);
        classifiedData.get(item['거래일자']).push(item);
      } else {
        classifiedData.get(item['거래일자']).push(item);
      }
    });

    setTransactionsByDate(classifiedData);
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <View style={StyleSheet.container}>
      <Text>거래 이체 내역</Text>
      <TransactionList data={transactionsByDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionHistory;
