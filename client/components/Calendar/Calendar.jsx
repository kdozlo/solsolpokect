import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { ScrollView } from 'react-native';

import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import { useCalendar } from '../../hooks/use-calendar';
import { generateDate } from '../../utils/CalendarUtils';

// Calendar 컴포넌트는 재사용될 수 있도록 설계가 필요
// - 날짜를 누르면 해당 날짜에 대한 정보만 반환하는 컴포넌트로 작성하기
// - 해당 날짜 정보를 가지고 나머지 데이터를 요청하는 방식으로 달력 컴포넌트를 만드는 것이 중요
const Calendar = () => {
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(dayjs());

  // selectedDate를 기반으로 현재 달의 정보를 받아와 달력에 표시될 날짜들 정보를 받아온다.
  const monthDates = generateDate(selectedDate);

  return (
    <ScrollView>
      <CalendarHeader />
      <CalendarBody monthDates={monthDates} />
    </ScrollView>
  );
};

export default Calendar;
