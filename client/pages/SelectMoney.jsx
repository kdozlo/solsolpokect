import { Text, View } from 'react-native';

import GoBackHeader from '../components/GoBackHeader';
import NumberPad from '../components/Transfer/NumberPad';
import TransferMoney from '../components/Transfer/TransferMoney';
import { dummyUser } from '../test/dummyData/user';

const SelectMoney = props => {
  return (
    <View>
      <GoBackHeader title={'얼마를 보낼까요?'}>
        <View>
          <Text>{dummyUser.name}님께</Text>
          <View></View>
        </View>
      </GoBackHeader>
      <TransferMoney />
      <NumberPad />
    </View>
  );
};

export default SelectMoney;
