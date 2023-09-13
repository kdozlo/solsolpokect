import { Image, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import AccountInfo from '../components/AccountInfo';
import GoBackHeader from '../components/GoBackHeader';
import NumberPad from '../components/Transfer/NumberPad';
import TransferMoney from '../components/Transfer/TransferMoney';
import { icons } from '../constants';
import { transferAccountNumberAtom, transferSelectedBankAtom } from '../recoil/transfer';
import { dummyUser } from '../test/dummyData/user';
import { BANK_INFO_LIST } from '../utils/const/bank';

const SelectMoney = ({ navigation }) => {
  const transferAccountNum = useRecoilValue(transferAccountNumberAtom);
  const selectedBankIndex = useRecoilValue(transferSelectedBankAtom);
  const bankInfo = BANK_INFO_LIST[selectedBankIndex];
  const buttonValueList = [
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
    <View>
      <GoBackHeader title={'얼마를 보낼까요?'} navigation={navigation}>
        <View style>
          <Text>{dummyUser.name}님께</Text>
          <AccountInfo bankLogo={bankInfo.image} bankName={bankInfo.name} accountNum={transferAccountNum} />
        </View>
      </GoBackHeader>
      <View style={{ alignItems: 'center' }}>
        <TransferMoney />
        <NumberPad buttonValueList={buttonValueList} pagekind={'transfer'} />
      </View>
    </View>
  );
};

export default SelectMoney;
