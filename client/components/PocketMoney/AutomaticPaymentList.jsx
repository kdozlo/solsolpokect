import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image, FlatList } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import HamburgerModal from './HamburgerModal';
import { COLORS, icons } from '../../constants';
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
        <Text styles={styles.headerFont}>정기 용돈</Text>
      </View>
    );
  };

  const renderPaymentItem = ({ item, index }) => {
    // console.log(item, '출력되고 있습니다.');
    console.log(item, selectedItemId);
    return (
      <View style={styles.paymentItem}>
        <View style={styles.paymentLeftItem}>
          <Text>매월 {item.autoDate ?? 17}일</Text>
          <Text>{item.money.toLocaleString()}원</Text>
        </View>
        <View style={styles.paymentRightItem}>
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
          <Pressable
            onPress={() => {
              navigation.navigate('SelectAccount');
            }}>
            <Text style={styles.sendMoneyButtonText}>용돈</Text>
            <Text style={styles.sendMoneyButtonText}>보내기</Text>
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
  header: {
    // fontSize: 16,
    // fontWeight: 700,
  },
  headerFont: {
    fontSize: 20,
    fontWeight: 700,
  },
  paymentItem: {
    position: 'relative',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: COLORS.lightBlue1,
    borderWidth: 1,
    borderColro: COLORS.lightGray,
    borderRadius: 10,
  },
  paymentLeftItem: {
    justifyContent: 'space-between',
  },
  paymentRightItem: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  modifyButton: {
    position: 'relative',
  },
  sendMoneyButton: {
    padding: 10,
  },
  sendMoneyButtonText: {
    textAlign: 'center',
  },
  modifyImage: {
    width: 10,
    height: 10,
    // position: 'absolute',
    // top: 0,
    // right: 0,
  },
});

export default AutomaticPaymentList;
