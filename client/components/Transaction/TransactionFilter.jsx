import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { COLORS, icons } from '../../constants';
import { historyTransactionType } from '../../recoil/transaction';

const TransactionFilter = ({ setTypeModalVisible, setPeriodModalVisible }) => {
  const selectedType = useRecoilValue(historyTransactionType);
  return (
    <View style={{ flexDirection: 'row' }}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          color: COLORS.lightGray,
        }}
        onPress={() => {
          setTypeModalVisible(true);
        }}>
        <Text>{selectedType}</Text>
        <Image
          source={icons.down}
          resizeMode="contain"
          style={{
            marginLeft: 10,
            width: 10,
            height: 10,
            tintColor: 'black',
          }}
        />
      </Pressable>
    </View>
  );
};

export default TransactionFilter;
