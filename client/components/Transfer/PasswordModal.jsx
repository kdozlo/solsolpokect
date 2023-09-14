import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';

import NumberPad from './NumberPad';
import PasswordPins from './PasswordPins';
import { icons } from '../../constants';
import { authPinCountAtom } from '../../recoil/auth';
import { transferPWModalAtom } from '../../recoil/transfer';

const PasswordModal = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(transferPWModalAtom);
  const buttonValueList = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    '재배열',
    0,
    <Image
      source={icons.back}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
        tintColor: 'black',
      }}
    />,
  ];

  return (
    <Modal animationType="slide" transparent={true} visible={isModalOpen}>
      <TouchableOpacity
        style={{
          height: '100%',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          backgroundColor: 'black',
          opacity: 0.5,
        }}
        onPress={() => {
          setIsModalOpen(false);
        }}>
        <PasswordPins />
        <NumberPad buttonValueList={buttonValueList} pageKind={'password'} navigation={navigation} />
      </TouchableOpacity>
    </Modal>
  );
};

export default PasswordModal;
