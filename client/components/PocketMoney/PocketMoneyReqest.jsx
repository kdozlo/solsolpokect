import React from 'react';
import { View, FlatList } from 'react-native';

const apiData = {};

const PocketMoneyReqest = props => {
  const requestItem = () => {
    return <View>용돈 요청 컴포넌트</View>;
  };

  return <FlatList renderItem={requestItem} />;
};

export default PocketMoneyReqest;
