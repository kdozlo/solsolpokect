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
import { useRecoilValue, useSetRecoilState } from 'recoil';

import GoBackHeader from '../components/GoBackHeader';
import BankListModal from '../components/Transfer/BankListModal';
import { icons, images } from '../constants';
import { transferAccountNumberAtom, transferBankInfoModalAtom, transferSelectedBankAtom } from '../recoil/transfer';
import { BANK_LOGO_INFO } from '../utils/const/bank';

const SelectAccount = props => {
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom); // 선택된 은행 이름
  const setAccountNumber = useSetRecoilState(transferAccountNumberAtom);

  const setModalVisible = useSetRecoilState(transferBankInfoModalAtom);

  let accountNumValue = '';

  return (
    <KeyboardAvoidingView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={{ height: '100%' }}>
          <GoBackHeader title={'누구에게 보낼까요?'} />
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
                  source={BANK_LOGO_INFO[selectedBankIndex].image} // 이 부분을 신한은행 로고로 변경
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
                  {BANK_LOGO_INFO[selectedBankIndex].name}
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

            <TextInput
              style={{
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 17.5,
              }}
              onChangeText={newText => {
                accountNumValue = newText;
                console.log(accountNumValue);
              }}
              keyboardType="numeric"
              clearButtonMode="while-editing"
            />

            <Pressable
              style={{
                borderWidth: 1,
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 17.5,
              }}
              onPress={() => {
                setAccountNumber(accountNumValue);
                // 화면 이동 로직 작성 필요
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
