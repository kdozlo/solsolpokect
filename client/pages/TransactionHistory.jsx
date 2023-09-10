import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styled } from 'styled-components';

import TransactionList from '../components/TransactionList';
import { getTransactionList } from '../services/apis/transactionHistoryAPI';

const TransactionHistory = props => {
  const [transactionList, setTransactionList] = useState([]);
  const [transactionsByDate, setTransactionsByDate] = useState(new Map()); // 순서를 지켜주기 위해서 Map 객체를 사용

  // 1. API 데이터 받아오기
  useEffect(() => {
    // 마음에 안드는 코드.. 고치자!
    getTransactionList().then(res => {
      // api result 저장
      setTransactionList(prev => res);

      // 거래 일자 별로 데이터를 묶어줘야 한다.
      const classifiedData = new Map();
      transactionList.forEach(item => {
        if (classifiedData.get(item['거래일자']) === undefined) {
          classifiedData.set(item['거래일자'], []);
          classifiedData.get(item['거래일자']).push(item);
        } else {
          classifiedData.get(item['거래일자']).push(item);
        }
      });

      setTransactionsByDate(classifiedData);
    });
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
