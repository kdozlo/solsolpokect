import React from 'react';
import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
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
      <View style={styles.container}>
        <View
          style={{
            height: 170,
            width: SIZES.width * 0.8,
            backgroundColor: COLORS.lightGray,
            borderRadius: SIZES.radius,
            marginLeft: 10,
          }}>
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowBox: {
      width: 230,
      height: 230,
      backgroundColor: 'white',
      elevation: 10, // 그림자 효과를 주는 elevation 속성
      borderRadius: 10, // 모서리 둥글게 만들기
    },
  },
});

export default TransactionTypeModal;
