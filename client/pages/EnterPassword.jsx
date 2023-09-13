import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { useRecoilState } from 'recoil';

import NumberPad from '../components/Transfer/NumberPad';
import PasswordPins from '../components/Transfer/PasswordPins';
import { icons } from '../constants';
import { authPinCountAtom } from '../recoil/auth';

const EnterPassword = props => {
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
    <View
      style={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <PasswordPins />
      <NumberPad buttonValueList={buttonValueList} pageKind={'password'} />
    </View>
  );
};

export default EnterPassword;
