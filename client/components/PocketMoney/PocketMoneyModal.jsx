import React, { useEffect } from 'react';
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputBase,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import { COLORS, SIZES } from '../../constants';
import { automaticPaymentItemAtom, pocketMoneyModalAtom } from '../../recoil/pocketMoney';

const PocketMoneyModal = () => {
  const [modalVisible, setModalVisible] = useRecoilState(pocketMoneyModalAtom);
  const [automaticPaymentItem, setAutomaticPaymentItem] = useRecoilState(automaticPaymentItemAtom); // '+'버튼 눌렀으면 null, 수정 버튼 눌렀으면 not null

  useEffect(() => {
    if (!modalVisible) {
      setAutomaticPaymentItem(null);
    }
  }, [modalVisible]);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modalView}>
          <Pressable style={styles.modifyView} onPress={Keyboard.dismiss}>
            <View style={styles.modifyHeader}>
              <Text>{`자동 이체 ${automaticPaymentItem ? '수정' : '등록'}`}</Text>
            </View>
            <View style={styles.modifyMoney}>
              <TextInput
                style={styles.moneyInput}
                keyboardType="numeric"
                placeholder={automaticPaymentItem ? String(automaticPaymentItem.money) : '변경할 금액을 입력해주세요'}
              />
              <Text style={styles.moneyText}>원</Text>
            </View>
            <View style={styles.modifyFooter}>
              <Pressable style={styles.footerLeftButton} onPress={() => setModalVisible(false)}>
                <Text>취소</Text>
              </Pressable>
              <Pressable
                style={styles.footerRightButton}
                onPress={() => {
                  setModalVisible(false);
                  // 자동이체 수정이나 등록 api 실행
                }}>
                <Text>확인</Text>
              </Pressable>
            </View>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: SIZES.width * 0.8,
    backgroundColor: COLORS.gray,
    borderRadius: SIZES.radius,
  },
  modifyHeader: {},
  modifyMoney: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  moneyInput: {},
  moneyText: {},
  modifyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeftButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
  footerRightButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: 'blue',
  },
});
export default PocketMoneyModal;
