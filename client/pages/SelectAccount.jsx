import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import GoBackHeader from '../components/GoBackHeader';
import BankListModal from '../components/Transfer/BankListModal';
import { COLORS, icons, images } from '../constants';
import { transferAccountNumberAtom, transferBankInfoModalAtom, transferSelectedBankAtom } from '../recoil/transfer';
import { BANK_INFO_LIST } from '../utils/const/bank';

const SelectAccount = ({ navigation }) => {
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom); // 선택된 은행 이름
  const [accountNumber, setAccountNumber] = useRecoilState(transferAccountNumberAtom);

  const setModalVisible = useSetRecoilState(transferBankInfoModalAtom);

  // let accountNumValue = '';

  return (
    <KeyboardAvoidingView
      style={{
        padding: 20,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={{ height: '100%' }}>
          <GoBackHeader title={'누구에게 보낼까요?'} navigation={navigation} />

          <Text style={{ marginVertical: 20 }}>계좌번호 입력</Text>

          <View>
            {/* 모달 띄우는 버튼 컴포넌트 */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                marginBottom: 20,
              }}
              onPress={() => setModalVisible(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <Image
                  source={BANK_INFO_LIST[selectedBankIndex].image} // 이 부분을 신한은행 로고로 변경
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 10,
                    lineHeight: 16,
                    fontSize: 13,
                  }}>
                  {BANK_INFO_LIST[selectedBankIndex].name}
                </Text>
              </View>

              {/* 드롭 다운 아래 화살표(기호에 따라 표시) */}
              <View style={{ justifyContent: 'center', marginRight: 10 }}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: 'black',
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* 계좌 번호 */}
            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 17.5,
                marginBottom: 20,
              }}
              onChangeText={newText => {
                setAccountNumber(newText);
                // console.log(accountNumValue);
              }}
              value={accountNumber}
              keyboardType="numeric"
              clearButtonMode="while-editing"
            />

            <Pressable
              style={{
                // borderWidth: 1,
                backgroundColor: COLORS.blue,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 17.5,
              }}
              onPress={() => {
                // setAccountNumber(accountNumValue);
                navigation.navigate('SelectMoney');
              }}>
              <Text>다음</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <BankListModal />
    </KeyboardAvoidingView>
  );
};

export default SelectAccount;
