import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import { COLORS } from '../../constants';
import { authPinCountAtom } from '../../recoil/auth';
import { TOTAL_PINS } from '../../utils/const/auth';

const PasswordPins = () => {
  const pinCount = useRecoilValue(authPinCountAtom);

  console.log(pinCount);
  if (pinCount === TOTAL_PINS) {
    // 이체 api 호출하고 성공 시 성공화면 실패 시 실패화면으로 이동
    console.log('이체 수행' + pinCount);
  }

  const renderPins = () => {
    const pinComponentList = [];

    // 핀 최대 개수 만큼 만들어서 그려주기
    for (let index = 0; index < TOTAL_PINS; index++) {
      pinComponentList.push(
        index < pinCount ? (
          <View
            key={`pin-${index}`}
            style={{ width: 20, height: 20, borderRadius: 15, borderWidth: 1, borderColor: COLORS.blue }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: COLORS.blue,
                backgroundColor: COLORS.blue,
                margin: -1,
              }}></View>
          </View>
        ) : (
          <View
            key={`pin-${index}`}
            style={{
              width: 20,
              height: 20,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: COLORS.lightBlue2,
              backgroundColor: COLORS.lightBlue1,
            }}></View>
        ),
      );
    }

    return pinComponentList;
  };

  return (
    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', padding: '20%' }}>
      {renderPins()}
    </View>
  );
};
export default PasswordPins;
