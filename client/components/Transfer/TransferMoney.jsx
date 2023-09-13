import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { transferMoneyAtom } from '../../recoil/transfer';

const TransferMoney = props => {
  const money = useRecoilValue(transferMoneyAtom);

  return (
    <View>
      <Text>{money === 0 ? '금액을 입력하세요' : `${money}원`}</Text>
    </View>
  );
};

export default TransferMoney;
