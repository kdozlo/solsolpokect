import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image, FlatList } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import HamburgerModal from './HamburgerModal';
import { icons } from '../../constants';
import { accountUserAtom, familyMemberListAtom } from '../../recoil/accountBook';
import {
  automaticCurrentMoneyAtom,
  automaticPaymentItemAtom,
  automaticPaymentListAtom,
  pocketMoneyModalAtom,
} from '../../recoil/pocketMoney';
import { transferAccountNumberAtom, transferSelectedBankAtom } from '../../recoil/transfer';
import { getAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { getUserInfo } from '../../services/apis/userAPI';

const AutomaticPaymentList = ({ navigation }) => {
  const selectedUserId = useRecoilValue(accountUserAtom);
  const setTransferBankInfo = useSetRecoilState(transferSelectedBankAtom);
  const setTransferAccount = useSetRecoilState(transferAccountNumberAtom);

  const [automaticPaymentList, setAutomaticPaymentList] = useRecoilState(automaticPaymentListAtom);

  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);

  const getAccountNumber = async () => {
    const accountInfo = await getUserInfo(selectedUserId);
    setTransferAccount(accountInfo.account);
    setTransferBankInfo(0);
  };
  useEffect(() => {
    getAccountNumber();
  }, []);

  // 정기용돈 리스트 받아오기
  const getPaymentData = async () => {
    const result = await getAutomaticPaymentList(selectedUserId);
    setAutomaticPaymentList(result);
  };
  useEffect(() => {
    getPaymentData();
  }, [selectedUserId]);

  // 헤더 컴포넌트
  const renderHeader = () => {
    return (
      <View>
        <Text>정기 용돈</Text>
      </View>
    );
  };

  const renderPaymentItem = ({ item, index }) => {
    // console.log(item, '출력되고 있습니다.');
    console.log(item, selectedItemId);
    return (
      <View>
        <Text>매월 {item.autoDate ?? 17}일</Text>
        <Text>{item.money.toLocaleString()}원</Text>
        <Pressable
          onPress={() => {
            navigation.navigate('SelectAccount');
          }}>
          <Text>용돈 보내기</Text>
        </Pressable>
        <View>
          <Pressable
            style={styles.modifyButton}
            onPress={() => {
              // setTransferAccount();
              setModifyModalVisible(pre => !pre);
              setSelectedItemId(item.autoTransferId);
            }}>
            <Image source={icons.more} style={styles.modifyImage} />
            {modifyModalVisible && item.autoTransferId === selectedItemId && (
              <HamburgerModal setModalVisible={setModifyModalVisible} selectedItem={item} />
            )}
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={automaticPaymentList}
      keyExtractor={(_, index) => `autoPay-${index}`}
      ListHeaderComponent={renderHeader}
      CellRendererComponent={renderPaymentItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
  paymentItem: {},
  modifyButton: {
    position: 'relative',
  },
  modifyImage: {
    width: 10,
    height: 10,
  },
});

export default AutomaticPaymentList;
