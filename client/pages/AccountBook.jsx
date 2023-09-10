import { SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components';

import Calendar from '../components/Calendar/Calendar';
import FamilyList from '../components/FamilyList';
import GoBackHeader from '../components/GoBackHeader';
import { dummyFamily } from '../test/dummyData/user';

const AccountBook = props => {
  return (
    <ScrollView>
      <GoBackHeader title={`${dummyFamily.familyName}이네 가계부`} />
      <AccountBookView>
        <FamilyList />
        {/* 캘린더 */}
        <Calendar />
      </AccountBookView>
    </ScrollView>
  );
};

const AccountBookView = styled.SafeAreaView`
  align-items: center;
  flex-direction: col;
`;

export default AccountBook;
