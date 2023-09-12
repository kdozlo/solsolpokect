import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styled } from 'styled-components';

import TransactionFilter from '../components/Transaction/TransactionFilter';
import TransactionList from '../components/Transaction/TransactionList';
import TransactionTypeModal from '../components/Transaction/TransactionTypeModal';
import { getTransactionList } from '../services/apis/transactionHistoryAPI';

const TransactionHistory = props => {
  const [transactionList, setTransactionList] = useState([]);
  const [transactionsByDate, setTransactionsByDate] = useState(new Map()); // 순서를 지켜주기 위해서 Map 객체를 사용
  const [typeModalVisible, setTypeModalVisible] = useState(false);

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

      console.log(res);
      setTransactionsByDate(classifiedData);
    });
  }, []);

  return (
    <View style={{ width: '100%' }}>
      {/* <Text>거래 이체 내역</Text> */}
      <TransactionFilter setTypeModalVisible={setTypeModalVisible} />
      <TransactionList data={transactionsByDate} />
      <TransactionTypeModal setModalVisible={setTypeModalVisible} modalVisible={typeModalVisible} />
    </View>
  );
};

export default TransactionHistory;
