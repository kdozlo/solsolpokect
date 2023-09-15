import React from 'react';
import { Text, View } from 'react-native';

import FamilyList from '../components/Family/FamilyList';
import GoBackHeader from '../components/GoBackHeader';

const ManagingPocketMoney = ({ navigation }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <GoBackHeader title={'용돈 관리'} navigation={navigation} />
      <FamilyList pageInfo={'ManagingPocketMoney'} />
    </View>
  );
};

export default ManagingPocketMoney;
