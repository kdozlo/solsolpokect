import dayjs from 'dayjs';
import { useCallback } from 'react';
import { FlatList, FlatListComponent, View, Text } from 'react-native';

import CalendarItem from './CalendarItem';
import { getDayColor, getDayText } from '../../utils/CalendarUtils';

// 요일(글자 부분_ListHeaderComponent) + 날짜(숫자 부분_FlatList)
const CalendarBody = ({ selectedDate, setSelectedDate, monthDates }) => {
  // const [selectedDate, setSelectedDate] = useRecoilState(accountDateAtom);

  // 요일(글자 부분_ListHeaderComponent)
  // - 일 ~ 토요일 표시
  const ListHeaderComponent = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        {[0, 1, 2, 3, 4, 5, 6].map(dayOfWeek => {
          const dayText = getDayText(dayOfWeek);
          const dayColor = getDayColor(dayOfWeek);

          return (
            <CalendarItem
              key={`day-${dayOfWeek}`}
              text={dayText}
              color={dayColor}
              opacity={1}
              disabled={true}
            />
          );
        })}
      </View>
    );
  };

  // 날짜(숫자)에 해당하는 컴포넌트
  const CalenderNumItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date');
    const dayColor = getDayColor(dayjs(date).get('day'));
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const isSelected = dayjs(date).isSame(selectedDate, 'date');

    return (
      <CalendarItem
        onPress={() => setSelectedDate(date)}
        text={dateText}
        color={dayColor}
        opacity={isCurrentMonth ? 1 : 0.4}
        disabled={false}
        isSelected={isSelected}
      />
    );
  };

  return (
    <View>
      {/* 날짜(숫자)에 해당하는 부분 */}
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={monthDates}
        scrollEnabled={false}
        keyExtractor={(_, index) => `column-${index}`}
        numColumns={7}
        renderItem={CalenderNumItem}
      />
    </View>
  );
};

export default CalendarBody;
