import { SimpleLineIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import { getDayColor, getDayText } from '../utils/CalendarUtils';

const columnSize = 50;
const Column = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
  // hasTodo,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: columnSize,
        height: columnSize,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#AAEBFF' : 'transparent',
        borderRadius: columnSize / 2,
      }}>
      {/* <Text style={{ color, opacity, fontWeight: hasTodo ? 'bold' : 'normal' }}> */}
      <Text style={{ color, opacity, fontWeight: 'normal' }}>{text}</Text>
    </TouchableOpacity>
  );
};
const ArrowButton = ({ iconName, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
      <SimpleLineIcons name={iconName} size={15} color="#404040" />
    </TouchableOpacity>
  );
};

export default ({
  columns,
  todoList,
  selectedDate,
  onPressLeftArrow,
  onPressHeaderDate,
  onPressRightArrow,
  onPressDate,
}) => {
  console.log('columns', columns);

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format('YYYY.MM.DD');
    return (
      <View>
        {/* < YYYY.MM.DD. >  부분*/}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />

          <TouchableOpacity onPress={onPressHeaderDate}>
            <Text style={{ fontSize: 20, color: '#404040' }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>

          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
        </View>

        {/* 일 ~ 토  요일 표시 부분*/}
        <View style={{ flexDirection: 'row' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(day => {
            const dayText = getDayText(day);
            const color = getDayColor(day);
            return (
              <Column
                key={`day-${day}`}
                text={dayText}
                color={color}
                opacity={1}
                disabled={true}
              />
            );
          })}
        </View>
      </View>
    );
  };

  // 날짜 표시 부분이다. date라는 day.js 객체를 받아서 날짜, 요일(day), 달로 나누어서 값들에 저장한다.
  // isSelected는 use-todo-List에서 isSame이란 함수를 사용해서 사용자가 선택한 일자와 같은 dayjs 객체를 특정한다.
  // 특정된 날짜는 진하게 표시된다.
  const renderItem = ({ item: date }) => {
    const dateText = dayjs(date).get('date');
    const day = dayjs(date).get('day');
    const color = getDayColor(day);
    const isCurrentMonth = dayjs(date).isSame(selectedDate, 'month');
    const onPress = () => onPressDate(date);
    const isSelected = dayjs(date).isSame(selectedDate, 'date');
    // const hasTodo = todoList.find(todo =>
    //   dayjs(todo.date).isSame(dayjs(date), 'date'),
    // );
    return (
      <Column
        text={dateText}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.4}
        onPress={onPress}
        isSelected={isSelected}
        // hasTodo={hasTodo}
      />
    );
  };

  return (
    <FlatList
      data={columns}
      scrollEnabled={false}
      keyExtractor={(_, index) => `column-${index}`}
      numColumns={7}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};
