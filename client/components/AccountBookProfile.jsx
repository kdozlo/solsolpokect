import React from 'react';
import { Image, View, Text, Touchable, TouchableOpacity } from 'react-native';

import { images } from '../constants';

const AccountBookProfile = props => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#26293F',
        flexDirection: 'row',
        padding: 10,
      }}>
      <Image source={images.father} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: '#ffffff' }}>지출 금액: 3,750원</Text>
        <Text style={{ color: '#ffffff' }}>이달의 소비: 10,500원</Text>
        <Text style={{ color: '#ffffff' }}>이달의 목표 소비: 50,000원</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccountBookProfile;
