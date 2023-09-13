import React from 'react';
import { Image, Text } from 'react-native';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { icons } from '../../constants';
import { transferMoneyAtom } from '../../recoil/transfer';

const NumberPad = ({ navigation }) => {
  const setMoney = useSetRecoilState(transferMoneyAtom);

  const handlePressNumber = number => {
    setMoney(prev => prev * 10 + number);
  };
  const handlePressDelete = () => {
    setMoney(prev => parseInt(prev / 10));
  };
  const handlePressDone = () => {
    console.log('비밀번호 페이지로 이동');
    // navigation.navigate();
  };

  const buttons = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    <Image
      source={icons.back}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
        tintColor: 'black',
      }}
    />,
    0,
    '완료',
  ];

  return (
    <KeyPad>
      {buttons.map((value, index) => {
        return (
          <PadButton
            key={index}
            onPress={() => {
              if (typeof value === 'number') {
                handlePressNumber(value);
              } else if (typeof value === 'string') {
                handlePressDone();
              } else {
                handlePressDelete();
              }
            }}
            delayPressIn={0}>
            {typeof value === 'string' || typeof value === 'number' ? (
              <Text large heavy>
                {value}
              </Text>
            ) : (
              value
            )}
          </PadButton>
        );
      })}
    </KeyPad>
  );
};

const KeyPad = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  background-color: #ffffff;
`;

const PadButton = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  border-width: 1px;
  border-color: #ffffff;
`;

export default NumberPad;
