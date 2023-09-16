import React, { useEffect, useState } from 'react';
import { View, Pressable, StyleSheet, Text, Image, FlatList } from 'react-native';
import { useSetRecoilState } from 'recoil';

import HamburgerModal from './HamburgerModal';
import { icons } from '../../constants';
import { automaticPaymentItemAtom, pocketMoneyModalAtom } from '../../recoil/pocketMoney';
import { getAutomaticPaymentList } from '../../services/apis/automaticPaymentAPI';
import { parentDummyUser } from '../../test/dummyData/user';

const AutomaticPaymentList = () => {
  const setAutomaticPaymentItem = useSetRecoilState(automaticPaymentItemAtom);
  const [modifyModalVisible, setModifyModalVisible] = useState(false);
  const [automaticPaymentList, setAutomaticPaymentList] = useState([]);

  const getPaymentData = async () => {
    const result = await getAutomaticPaymentList(parentDummyUser.id);
    setAutomaticPaymentList(result);
  };

  useEffect(() => {
    getPaymentData();
    console.log(automaticPaymentList);
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <Text>정기 용돈</Text>
      </View>
    );
  };

  // onLayout은 상대좌표만 주기 때문에 useRef를 쓰는게 맞다.
  const renderPaymentItem = ({ item, index }) => {
    console.log(item, '출력되고 있습니다.');
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
              setAutomaticPaymentItem(item);
              setModifyModalVisible(pre => !pre);
            }}>
            <Image source={icons.more} style={styles.modifyImage} />
            {modifyModalVisible && <HamburgerModal setModalVisible={setModifyModalVisible} item={item} />}
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
