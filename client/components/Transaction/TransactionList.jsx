import { Text, FlatList } from 'react-native';
import { styled } from 'styled-components';

import TransactionItem from './TransactionItem';

const TransactionList = ({ data }) => {
  const transactionsByDate = data;

  const renderTransactionItem = ({ item }) => {
    return <TransactionItem data={item} />;
  };

  // 날짜별 묶음 거래 내역 컴포넌트들을 만들어서 리스트로 반환
  const renderTransactions = () => {
    const componentList = [];
    for (const [date, transactions] of transactionsByDate.entries()) {
      componentList.push(
        <FlatList
          ListHeaderComponent={<Text>{date.slice(0, 4) + '.' + date.slice(4, 6) + '.' + date.slice(6)}</Text>}
          key={`${date} 거래 내역 묶음`}
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(value, index) => `내역 리스트-${index}`}
          showsVerticalScrollIndicator={false}
        />,
      );
    }

    return componentList;
  };

  return <>{renderTransactions()}</>;
};

export default TransactionList;
