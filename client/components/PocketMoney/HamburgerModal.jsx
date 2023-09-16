import React, { forwardRef, useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { COLORS, SIZES } from '../../constants';
import { automaticPaymentItemAtom, automaticPaymentListAtom, pocketMoneyModalAtom } from '../../recoil/pocketMoney';
import { deleteAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { DELETE_SUCCESS_MSG } from '../../utils/const/api';

const HamburgerModal = ({ setModalVisible, item }) => {
  const setPocketModal = useSetRecoilState(pocketMoneyModalAtom);
  const [automaticPaymentItem, setAutomaticPaymentItem] = useRecoilState(automaticPaymentItemAtom); // '+'버튼 눌렀으면 null, 수정 버튼 눌렀으면 not null
  const [automaticPaymentList, setAutomaticPaymentList] = useRecoilState(automaticPaymentListAtom);

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.backgroundArea}>
        <View
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            backgroundColor: 'skyblue',
          }}>
          <Pressable
            onPress={() => {
              // 햄버거 모달은 끄고 수정 모달 띄우기
              setModalVisible(false);
              setAutomaticPaymentItem(item);
              setPocketModal(true);
            }}>
            <Text>수정</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              // 햄버거 모달은 끄고 삭제 api 호출
              setModalVisible(false);
              const result = await deleteAutomaticPaymentList(automaticPaymentItem.autoTransferId);
              if (result == DELETE_SUCCESS_MSG) {
                setAutomaticPaymentList(pre => {
                  return pre.filter(item => item.autoTransferId !== automaticPaymentItem.autoTransferId);
                });
              }
            }}>
            <Text>삭제</Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backgroundArea: {
    position: 'relative',
    // height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: 'red',
  },
  modalInnerView: {
    position: 'absolute',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 200,
    width: 200,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.radius,
  },
});

export default HamburgerModal;
