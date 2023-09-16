import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image, FlatList } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import HamburgerModal from './HamburgerModal';
import { icons } from '../../constants';
import {
  automaticCurrentMoneyAtom,
  automaticPaymentItemAtom,
  automaticPaymentListAtom,
  pocketMoneyModalAtom,
} from '../../recoil/pocketMoney';
import { getAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { parentDummyUser } from '../../test/dummyData/user';

const AutomaticPaymentList = () => {
  const [automaticPaymentList, setAutomaticPaymentList] = useRecoilState(automaticPaymentListAtom);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);

  // 정기용돈 리스트 받아오기
  const getPaymentData = async () => {
    const result = await getAutomaticPaymentList(parentDummyUser.id);
    setAutomaticPaymentList(result);
  };
  useEffect(() => {
    getPaymentData();
    // console.log(automaticPaymentList);
  }, []);

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
            // 이체 페이지로 이동
          }}>
          <Text>용돈 보내기</Text>
        </Pressable>
        <View>
          <Pressable
            style={styles.modifyButton}
            onPress={() => {
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
      data={automaticPaymentList}
      keyExtractor={(_, index) => `autoPay-${index}`}
      ListHeaderComponent={renderHeader}
      CellRendererComponent={renderPaymentItem}
    />
  );
};

const styles = StyleSheet.create({
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
