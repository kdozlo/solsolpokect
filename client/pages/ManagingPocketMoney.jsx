import React, { useRef } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';

import FamilyList from '../components/Family/FamilyList';
import GoBackHeader from '../components/GoBackHeader';
import AutomaticPaymentList from '../components/PocketMoney/AutomaticPaymentList';
import PocketMoneyModal from '../components/PocketMoney/PocketMoneyModal';
import { COLORS, icons } from '../constants';
import { pocketMoneyModalAtom } from '../recoil/pocketMoney';

const ManagingPocketMoney = ({ navigation }) => {
  const setModalVisible = useSetRecoilState(pocketMoneyModalAtom);

  return (
    <View style={styles.container}>
      <GoBackHeader title={'용돈 관리'} navigation={navigation} />
      <FamilyList pageInfo={'ManagingPocketMoney'} />
      <AutomaticPaymentList />
      <Pressable style={styles.plusButton} onPress={() => setModalVisible(true)}>
        <Image source={icons.plus} style={styles.plusImage} />
      </Pressable>
      <PocketMoneyModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  header: {},
  paymentItem: {},
  plusButton: {
    width: '100%',
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  plusImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default ManagingPocketMoney;
