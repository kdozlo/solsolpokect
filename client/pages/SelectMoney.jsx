import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import AccountInfo from '../components/AccountInfo';
import GoBackHeader from '../components/GoBackHeader';
import NumberPad from '../components/Transfer/NumberPad';
import TransferMoney from '../components/Transfer/TransferMoney';
import { transferAccountNumberAtom, transferSelectedBankAtom } from '../recoil/transfer';
import { dummyUser } from '../test/dummyData/user';
import { BANK_INFO_LIST } from '../utils/const/bank';

const SelectMoney = ({ navigation }) => {
  const transferAccountNum = useRecoilValue(transferAccountNumberAtom);
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom);
  const bankInfo = BANK_INFO_LIST[selectedBankIndex];

  return (
    <View>
      <GoBackHeader title={'얼마를 보낼까요?'} navigation={navigation}>
        <View style>
          <Text>{dummyUser.name}님께</Text>
          <AccountInfo bankLogo={bankInfo.image} bankName={bankInfo.name} accountNum={transferAccountNum} />
        </View>
      </GoBackHeader>
      <View style={{ alignItems: 'center' }}>
        <TransferMoney />
        <NumberPad />
      </View>
    </View>
  );
};

export default SelectMoney;
