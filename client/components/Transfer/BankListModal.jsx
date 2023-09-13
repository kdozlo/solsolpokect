import React from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { COLORS, SIZES, images } from '../../constants';
import { transferBankInfoModalAtom, transferSelectedBankAtom } from '../../recoil/transfer';
import { BANK_INFO_LIST } from '../../utils/const/bank';

// 모달 창 컴포넌트
// - 여러 개의 은행 정보를 리스트 형태로 표현해준다.
const BankListModal = props => {
  const [modalVisible, setModalVisible] = useRecoilState(transferBankInfoModalAtom);
  const setSelectedBankInfo = useSetRecoilState(transferSelectedBankAtom); // 선택된 은행 이름

  const bankItem = ({ index, item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{ padding: SIZES.padding, flexDirection: 'row', alignItems: 'center' }}
        onPress={() => {
          setModalVisible(false);
          setSelectedBankInfo(index);
        }}>
        <Image
          source={item.image} // 이 부분을 신한은행 로고로 변경
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
          }}
        />
        <Text style={{ color: 'black', marginLeft: 10, lineHeight: 16, fontSize: 13 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      {/* 리스트 선택 화면 */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 400,
              width: SIZES.width * 0.8,
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
            }}>
            <FlatList
              data={BANK_INFO_LIST}
              renderItem={bankItem}
              keyExtractor={(_, index) => `bank-${index}`}
              showsVerticalScrollIndicator={false}
              style={{
                padding: SIZES.padding * 2,
                marginBottom: SIZES.padding * 2,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BankListModal;
