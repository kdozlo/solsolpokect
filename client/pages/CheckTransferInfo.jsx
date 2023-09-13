import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

import AccountInfo from '../components/AccountInfo';
import GoBackHeader from '../components/GoBackHeader';
import AccountBalance from '../components/Transfer/AccountBalance';
import TransferMoney from '../components/Transfer/TransferMoney';
import { transferAccountNumberAtom, transferMoneyAtom, transferSelectedBankAtom } from '../recoil/transfer';
import { dummyUser } from '../test/dummyData/user';
import { BANK_INFO_LIST } from '../utils/const/bank';

const CheckTransferInfo = ({ navigation }) => {
  const transferAccountNum = useRecoilValue(transferAccountNumberAtom);
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom);

  const bankInfo = BANK_INFO_LIST[selectedBankIndex];

  return (
    <View>
      <GoBackHeader navigation={navigation}>
        <View style>
          <Text>{dummyUser.name}님께</Text>
          <AccountInfo
            isLogoVisible={true}
            bankLogo={bankInfo.image}
            bankName={bankInfo.name}
            accountNum={transferAccountNum}
          />
        </View>
      </GoBackHeader>
      <TransferMoney pageKind={'CheckTransferInfo'} />
      <AccountBalance />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable
          style={{
            flex: 2,
            alignItems: 'center',
            paddingVertical: 10,
            borderRadius: 5,
            backgroundColor: 'blue',
          }}>
          <Text>추가이체</Text>
        </Pressable>
        <Pressable
          style={{
            flex: 3,
            alignItems: 'center',
            paddingVertical: 10,
            marginLeft: 10,
            borderRadius: 5,
            backgroundColor: 'blue',
          }}>
          <Text>이체</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default CheckTransferInfo;
