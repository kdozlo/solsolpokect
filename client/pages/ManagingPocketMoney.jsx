import React, { useEffect, useRef } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import FamilyList from '../components/Family/FamilyList';
import GoBackHeader from '../components/GoBackHeader';
import AutomaticPaymentList from '../components/PocketMoney/AutomaticPaymentList';
import PocketMoneyModal from '../components/PocketMoney/PocketMoneyModal';
import { COLORS, icons } from '../constants';
import { accountUserAtom, familyMemberApiResAtom } from '../recoil/accountBook';
import { pocketMoneyModalAtom } from '../recoil/pocketMoney';
import { loggedInUserAtom } from '../recoil/user';
import { getFamilyMemberIdList } from '../services/apis/familyAPI';

const ManagingPocketMoney = ({ navigation }) => {
  const [familyApiRes, setFamilyApiRes] = useRecoilState(familyMemberApiResAtom);

  const setModalVisible = useSetRecoilState(pocketMoneyModalAtom);
  const setSelectedUserId = useSetRecoilState(accountUserAtom);

  // 가족 id 정보 받아오기
  useEffect(() => {
    setSelectedUserId(null);

    const getFamilyMemberList = async () => {
      const result = await getFamilyMemberIdList(loggedInUserAtom.id);
      setFamilyApiRes(result);
    };
    getFamilyMemberList();
  }, []);

  return (
    <View style={styles.container}>
      <GoBackHeader title={'용돈 관리'} navigation={navigation} />
      <FamilyList pageInfo={'ManagingPocketMoney'} memberApiRes={familyApiRes} />
      <View>
        <AutomaticPaymentList navigation={navigation} />
      </View>
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
    padding: 20,
  },
  header: {},
  paymentItem: {},
  plusButton: {
    width: '100%',
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  plusImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
});

export default ManagingPocketMoney;
