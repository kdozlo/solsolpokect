import React, { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import NumberPad from './NumberPad';
import PasswordPins from './PasswordPins';
import { icons } from '../../constants';
import { authPWModalAtom, authPWValueAtom, authPinCountAtom } from '../../recoil/auth';

const PasswordModal = ({ navigation }) => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(authPWModalAtom);
  const setPinCount = useSetRecoilState(authPinCountAtom);
  const setPWValue = useSetRecoilState(authPWValueAtom);

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
          setPinCount(0);
          setPWValue('');
        }}>
        <PasswordPins navigation={navigation} />
        <NumberPad buttonValueList={buttonValueList} pageKind={'password'} navigation={navigation} />
      </TouchableOpacity>
    </Modal>
  );
};

export default PasswordModal;
