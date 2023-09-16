import React from 'react';
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { COLORS, icons } from '../../constants';
import { historyTransactionType } from '../../recoil/transaction';

const TransactionFilter = ({ setTypeModalVisible, setPeriodModalVisible }) => {
  const selectedType = useRecoilValue(historyTransactionType);
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // borderWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          backgroundColor: COLORS.gray,
        }}
        onPress={() => {
          setTypeModalVisible(true);
        }}>
        <Text style={{ color: '#5B5B5B', fontWeight: 'bold' }}>{selectedType}</Text>
        <Image
          source={icons.down}
          resizeMode="contain"
          style={{
            marginLeft: 10,
            width: 10,
            height: 10,
            tintColor: 'gray',
          }}
        />
      </Pressable>
    </View>
  );
};

export default TransactionFilter;
