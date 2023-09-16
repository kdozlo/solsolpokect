import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import AccountInfo from '../components/AccountInfo';
import GoBackHeader from '../components/GoBackHeader';
import AccountBalance from '../components/Transfer/AccountBalance';
import PasswordModal from '../components/Transfer/PasswordModal';
import TransferMoney from '../components/Transfer/TransferMoney';
import {
  transferAccountNumberAtom,
  transferMoneyAtom,
  transferPWModalAtom,
  transferSelectedBankAtom,
} from '../recoil/transfer';
import { dummyUser } from '../test/dummyData/user';
import { BANK_INFO_LIST } from '../utils/const/bank';

const TransferSuccess = ({ navigation }) => {
  const transferAccountNum = useRecoilValue(transferAccountNumberAtom);
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom);
  const money = useRecoilValue(transferMoneyAtom);

  const bankInfo = BANK_INFO_LIST[selectedBankIndex];

  return (
    <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style>
        <Text>{dummyUser.name}님께</Text>
        <AccountInfo
          isLogoVisible={false}
          bankLogo={bankInfo.image}
          bankName={bankInfo.name}
          accountNum={transferAccountNum}
        />
      </View>

      <View>
        <Text>{money.toLocaleString()}원</Text>
        <Text>보냈어요</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Pressable
          style={{
            alignItems: 'center',
            paddingVertical: 10,
            marginLeft: 10,
            borderRadius: 5,
            backgroundColor: 'blue',
          }}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Text>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default TransferSuccess;
