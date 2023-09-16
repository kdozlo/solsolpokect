import dayjs from 'dayjs';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import DateDropdown from './DateDropdown';
import { COLORS, SIZES } from '../../constants';
import { useCalendar } from '../../hooks/use-calendar';
import { accountDateAtom, accountUserAtom } from '../../recoil/accountBook';
import {
  automaticCurrentMoneyAtom,
  automaticPaymentDateAtom,
  automaticPaymentItemAtom,
  automaticPaymentListAtom,
  pocketMoneyModalAtom,
} from '../../recoil/pocketMoney';
import { addAutomaticPaymentList, updateAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { getUserInfo } from '../../services/apis/userAPI';
import { parentDummyUser } from '../../test/dummyData/user';
import { UPDATE_SUCCESS_MSG } from '../../utils/const/api';

const PocketMoneyModal = () => {
  // recoil states...
  const [modalVisible, setModalVisible] = useRecoilState(pocketMoneyModalAtom); // 포켓 모달이 뜰지 말지
  const setAutomaticPaymentList = useSetRecoilState(automaticPaymentListAtom); // 추가, 수정으로 인한 list 정보 변경 반영
  const [automaticPaymentItem, setAutomaticPaymentItem] = useRecoilState(automaticPaymentItemAtom); // 선택된 아이템 정보 가져오기 + 모달 꺼질 때 초기화

  const itemDate = useRecoilValue(automaticPaymentDateAtom); // 선택된 달력 날짜
  const selectedUserId = useRecoilValue(accountUserAtom); // 용돈 이체 목록의 주인(돈 받을 대상)
  const selectedDate = useRecoilValue(accountDateAtom);

  // components states...
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [moneyValue, setMoneyValue] = useRecoilState(automaticCurrentMoneyAtom);

  // 용돈 줄 사람의 정보 받아오기
  const getSelectedUserInfo = async () => {
    // console.log(selectedUserId);
    const result = await getUserInfo(selectedUserId);
    setSelectedUserInfo(result);
  };
  // initial setting..
  useEffect(() => {
    getSelectedUserInfo();
    // console.log(selectedUserInfo);
  }, []);

  // 모달이 꺼질 때
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
            {/* 자동 이체 일 정하기 */}
            <View style={styles.modifyDate}>
              <View>
                <Text>매월</Text>
              </View>
              <DateDropdown autoDate={automaticPaymentItem ? automaticPaymentItem.autoDate : 1} />
            </View>
            {/* 자동 이체 금액 정하기 */}
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
                    console.log('수정 api 호출');
                    const result = await updateAutomaticPaymentList(
                      automaticPaymentItem.autoTransferId,
                      itemDate,
                      parseInt(moneyValue),
                    );
                    if (result === UPDATE_SUCCESS_MSG) {
                      setAutomaticPaymentList(pre => {
                        const result = pre.map(item => {
                          if (item.autoTransferId === automaticPaymentItem.autoTransferId) {
                            console.log('동일한 아이템', moneyValue);
                            return {
                              ...item,
                              money: moneyValue,
                              autoDate: 15,
                            };
                          } else {
                            return item;
                          }
                        });

                        return result;
                      });
                    }
                  } else {
                    // console.log('추가 api 호출');
                    const result = await addAutomaticPaymentList(
                      '',
                      parseInt(moneyValue),
                      parseInt(parentDummyUser.id),
                      selectedUserInfo.account,
                    );
                    // console.log('result', result);
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
  modifyDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
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
