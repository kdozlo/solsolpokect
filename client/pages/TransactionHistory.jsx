import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TransactionFilter from '../components/Transaction/TransactionFilter';
import TransactionList from '../components/Transaction/TransactionList';
import TransactionTypeModal from '../components/Transaction/TransactionTypeModal';
import { getTransactionList } from '../services/apis/transactionHistoryAPI';

const TransactionHistory = props => {
  const [transactionsByDate, setTransactionsByDate] = useState(new Map()); // 순서를 지켜주기 위해서 Map 객체를 사용
  const [typeModalVisible, setTypeModalVisible] = useState(false);

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
    <View style={{ width: '100%' }}>
      {/* <Text>거래 이체 내역</Text> */}
      <TransactionFilter setTypeModalVisible={setTypeModalVisible} />
      <TransactionList data={transactionsByDate} />
      <TransactionTypeModal setModalVisible={setTypeModalVisible} modalVisible={typeModalVisible} />
    </View>
  );
};

export default TransactionHistory;
