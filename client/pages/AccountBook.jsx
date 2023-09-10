import { SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components';

import GoBackHeader from '../components/GoBackHeader';
import { dummyFamily } from '../test/dummyData/user';

const AccountBook = props => {
  return (
    <ScrollView>
      <GoBackHeader title={`${dummyFamily.familyName}이네 가계부`} />
      <AccountBookView></AccountBookView>
    </ScrollView>
  );
};

const AccountBookView = styled.SafeAreaView`
  align-items: center;
  flex-direction: col;
`;

export default AccountBook;
