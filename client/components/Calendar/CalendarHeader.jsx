import dayjs from 'dayjs';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import ArrowButton from './ArrowButton';
import { useCalendar } from '../../hooks/use-calendar';
import { accountDateAtom } from '../../recoil/accountBook';

{
  /* < YYYY.MM.DD. > */
}
const CalendarHeader = ({ selectedDate }) => {
  // console.log('Calendar Header');
  const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD');

  // Event Handlers.
  // - 달력 맨  위의 " < 현재 날짜 > "에 필요한 Event Handler
  const { subtract1Month, showDatePicker, add1Month } = useCalendar();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ArrowButton iconName="arrow-left" onPress={subtract1Month} />

        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{ fontSize: 20, color: '#404040' }}>
            {currentDateText}
          </Text>
        </TouchableOpacity>

        <ArrowButton iconName="arrow-right" onPress={add1Month} />
      </View>
    </View>
  );
};

export default CalendarHeader;
