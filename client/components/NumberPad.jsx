import React from 'react';
import { Image, Text } from 'react-native';
import styled from 'styled-components';

import { icons } from '../constants';

const NumberPad = ({ onPress }) => {
  const buttons = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    <Image
      source={icons.back}
      resizeMode="contain"
      style={{
        width: 20,
        height: 20,
        tintColor: 'black',
      }}
    />,
    '0',
    '완료',
  ];

  return (
    <KeyPad>
      {buttons.map((value, index) => {
        return (
          <Number
            key={index}
            onPress={() => {
              onPress(value, index);
            }}
            delayPressIn={0}>
            {console.log(icons.barcode)}
            {typeof value == 'string' ? (
              <Text large heavy>
                {value}
              </Text>
            ) : (
              value
            )}
          </Number>
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

const Number = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  align-items: center;
  justify-content: center;
  margin: 5px 20px;
  border-width: 1px;
  border-color: #ffffff;
`;

export default NumberPad;
