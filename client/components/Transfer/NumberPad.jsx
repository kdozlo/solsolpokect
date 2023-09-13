import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { icons } from '../../constants';
import { authPinCountAtom } from '../../recoil/auth';
import { transferMoneyAtom } from '../../recoil/transfer';
import { shuffleNumber } from '../../utils/TransferUtils';
import { TOTAL_PINS } from '../../utils/const/auth';

const NumberPad = ({ navigation, buttonValueList, pageKind }) => {
  const [buttonValues, setButtonValues] = useState(buttonValueList);
  const [pinCount, setPinCount] = useRecoilState(authPinCountAtom);
  const setMoney = useSetRecoilState(transferMoneyAtom);

  const handlePressNumber = number => {
    if (pageKind === 'transfer') {
      setMoney(prev => prev * 10 + number);
    } else if (pageKind === 'password') {
      if (pinCount < TOTAL_PINS) setPinCount(pre => pre + 1);
    }
  };
  const handlePressDelete = () => {
    if (pageKind === 'transfer') {
      setMoney(prev => parseInt(prev / 10));
    } else if (pageKind === 'password') {
      if (pinCount > 0) setPinCount(pre => pre - 1);
    }
  };
  const handlePressString = string => {
    if (pageKind === 'transfer') {
      console.log('비밀번호 페이지로 이동');
      // navigation.navigate();
    } else if (pageKind === 'password') {
      const numButtonValues = buttonValues.filter(button => typeof button === 'number');
      const shuffledNumbers = shuffleNumber(numButtonValues);

      let shuffledIndex = 0;
      const shuffledButtonValues = buttonValues.map(buttonValue => {
        if (typeof buttonValue === 'number') {
          return shuffledNumbers[shuffledIndex++];
        } else {
          return buttonValue;
        }
      });

      setButtonValues(shuffledButtonValues);
    }
  };

  return (
    <KeyPad>
      {buttonValues.map((value, index) => {
        return (
          <PadButton
            key={index}
            onPress={() => {
              if (typeof value === 'number') {
                handlePressNumber(value);
              } else if (typeof value === 'string') {
                handlePressString(value);
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
