import React, { useEffect, useState } from 'react';
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
import { accountUserAtom } from '../../recoil/accountBook';
import { automaticPaymentItemAtom, automaticPaymentListAtom, pocketMoneyModalAtom } from '../../recoil/pocketMoney';
import { addAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { getUserInfo } from '../../services/apis/userAPI';
import { parentDummyUser } from '../../test/dummyData/user';

const PocketMoneyModal = () => {
  const [modalVisible, setModalVisible] = useRecoilState(pocketMoneyModalAtom);
  const [automaticPaymentList, setAutomaticPaymentList] = useRecoilState(automaticPaymentListAtom);
  const [automaticPaymentItem, setAutomaticPaymentItem] = useRecoilState(automaticPaymentItemAtom); // '+'버튼 눌렀으면 null, 수정 버튼 눌렀으면 not null
  const selectedUserId = useRecoilValue(accountUserAtom);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [moneyValue, setMoneyValue] = useState(0);

  const getSelectedUserInfo = async () => {
    console.log(selectedUserId);
    const result = await getUserInfo(selectedUserId);
    setSelectedUserInfo(result);
  };
  useEffect(() => {
    getSelectedUserInfo();
    console.log(selectedUserInfo);
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      setAutomaticPaymentItem(null);
      setMoneyValue(0);
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
                placeholder={'변경할 금액을 입력해주세요'}
                onChangeText={moneyText => {
                  setMoneyValue(moneyText);
                }}>
                {moneyValue}
              </TextInput>
              <Text style={styles.moneyText}>원</Text>
            </View>
            <View style={styles.modifyFooter}>
              <Pressable style={styles.footerLeftButton} onPress={() => setModalVisible(false)}>
                <Text>취소</Text>
              </Pressable>
              <Pressable
                style={styles.footerRightButton}
                onPress={async () => {
                  setModalVisible(false);
                  if (automaticPaymentItem) {
                    setMoneyValue(automaticPaymentItem.money);
                    // 수정 api 수행
                    console.log('수정 api 호출');
                  } else {
                    console.log(moneyValue, parentDummyUser.id, selectedUserInfo.account);
                    // 생성 api 수행 : autoDate, money, userId, childAccount
                    const result = await addAutomaticPaymentList(
                      '',
                      parseInt(moneyValue),
                      parseInt(parentDummyUser.id),
                      selectedUserInfo.account,
                    );

                    console.log('result', result);
                    setAutomaticPaymentList(pre => [...pre, result]);
                  }
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
