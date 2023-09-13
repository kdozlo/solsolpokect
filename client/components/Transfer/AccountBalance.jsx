import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { transferAccountNumberAtom, transferSelectedBankAtom } from '../../recoil/transfer';
import { BANK_INFO_LIST } from '../../utils/const/bank';
import AccountInfo from '../AccountInfo';

const accountBalance = 4000;

const AccountBalance = props => {
  const transferAccountNum = useRecoilValue(transferAccountNumberAtom);
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom);
  const bankInfo = BANK_INFO_LIST[selectedBankIndex];
  return (
    <View style={{ flexDirection: 'row' }}>
      <AccountInfo
        isLogoVisible={false}
        bankLogo={bankInfo.image}
        bankName={bankInfo.name}
        accountNum={transferAccountNum}
      />
      <Text style={{ marginLeft: 10 }}>{accountBalance.toLocaleString()}원</Text>
    </View>
  );
};

export default AccountBalance;
