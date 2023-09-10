import { SafeAreaView, ScrollView } from 'react-native';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import styled from 'styled-components';

import Calendar from '../components/Calendar/Calendar';
import FamilyList from '../components/FamilyList';
import GoBackHeader from '../components/GoBackHeader';
import { useCalendar } from '../hooks/use-calendar';
import { dummyFamily } from '../test/dummyData/user';

const AccountBook = props => {
  const { isDatePickerVisible, handleConfirm, hideDatePicker } = useCalendar();
  return (
    <ScrollView>
      <GoBackHeader title={`${dummyFamily.familyName}이네 가계부`} />
      <AccountBookView>
        <FamilyList />
        {/* 캘린더 */}
        <Calendar />
      </AccountBookView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

const AccountBookView = styled.SafeAreaView`
  align-items: center;
  flex-direction: col;
`;

export default AccountBook;
