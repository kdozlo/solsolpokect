import React from 'react';
import { Image, View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native';

import { images } from '../constants';

const AccountBookProfile = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={images.father} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: '#ffffff' }}>지출 금액: 3,750원</Text>
        <Text style={{ color: '#ffffff' }}>이달의 소비: 10,500원</Text>
        <Text style={{ color: '#ffffff' }}>이달의 목표 소비: 50,000원</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#26293F',
    flexDirection: 'row',
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    marginRight: 10,
  },
});

export default AccountBookProfile;
