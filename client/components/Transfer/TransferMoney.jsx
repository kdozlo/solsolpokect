import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { transferMoneyAtom } from '../../recoil/transfer';
import { formatKoreanMoney } from '../../utils/TransferUtils';

const TransferMoney = ({ pageKind }) => {
  const money = useRecoilValue(transferMoneyAtom);

  const renderSubText = () => {
    if (pageKind === 'SelectMoney') {
      return (
        <View style={{ color: 'lightgray' }}>
          <Text>{formatKoreanMoney(money)}원</Text>
        </View>
      );
    } else if (pageKind === 'CheckTransferInfo') {
      return (
        <View>
          <Text>보낼까요?</Text>
        </View>
      );
    }
  };

  return (
    <>
      <View>
        <Text>{money === 0 ? '금액을 입력하세요' : `${money.toLocaleString()}원`}</Text>
      </View>
      {renderSubText()}
    </>
  );
};

export default TransferMoney;
