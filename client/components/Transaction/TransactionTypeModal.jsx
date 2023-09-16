import React from 'react';
import { Modal, Text, TouchableWithoutFeedback, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRecoilState } from 'recoil';

import { COLORS, SIZES, icons } from '../../constants';
import { historyTransactionType } from '../../recoil/transaction';

const TRANSACTION_TYPES = ['입출금', '입금', '출금'];

const TransactionTypeModal = ({ modalVisible, setModalVisible }) => {
  const [selectedType, setSelectedType] = useRecoilState(historyTransactionType);

  const renderHeader = () => {
    return (
      <View style={{ marginBottom: 15 }}>
        <Text>내역 선택</Text>
      </View>
    );
  };

  // 계좌 1개의 정보를 담는 컴포넌트
  const renderItem = ({ item }) => {
    const type = item;
    return (
      <TouchableOpacity
        style={{ paddingVertical: SIZES.padding, flexDirection: 'row', justifyContent: 'space-between' }}
        onPress={() => {
          setSelectedType(type);
          setModalVisible(false);
        }}>
        <Text style={{ color: COLORS.black }}>{type}</Text>
        {selectedType === type && (
          <Image
            source={icons.check}
            resizeMode="contain"
            style={{
              width: 10,
              height: 10,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: 200,
            width: SIZES.width * 0.8,
            backgroundColor: COLORS.darkgray,
            borderRadius: SIZES.radius,
            marginLeft: 10,
          }}>
          {/* <Text>모달 컴포넌트 입니다.</Text> */}
          <FlatList
            ListHeaderComponent={renderHeader()}
            data={TRANSACTION_TYPES}
            renderItem={renderItem}
            keyExtractor={(_, index) => `type-${index}`}
            showsVerticalScrollIndicator={false}
            style={{
              padding: SIZES.padding * 2,
              marginBottom: SIZES.padding * 2,
            }}
          />
        </View>
      </View>
      {/* <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
              backgroundColor: COLORS.darkgray,
              borderRadius: SIZES.radius,
            }}>
            <Text>모달 컴포넌트</Text>
          </View>
        </View>
      </TouchableWithoutFeedback> */}
    </Modal>
  );
};

export default TransactionTypeModal;
