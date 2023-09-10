/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import AddTodoInput from '../components/AddTodoInput';
import CalendarContext from '../components/CalendarContext';
import Margin from '../components/Margin';
import { runPracticeDayjs } from '../components/practice-dayjs';
import { useCalendar } from '../hooks/use-calendar';
// eslint-disable-next-line import/namespace
import { useTodoList } from '../hooks/use-todo-list';
import {
  getCalendarColumns,
  ITEM_WIDTH,
  statusBarHeight,
  bottomSpace,
} from '../utils/CanlendarUtils';

export default function App() {
  const now = dayjs();

  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,
    resetInput,
  } = useTodoList(selectedDate);

  // selectedDate는 now라는 day.js를 통해 구한 오늘 일자를 나타낸다.
  // 오늘 일자를 getCalendarColumns에 넣어서 해당 일자가 속한 달의 일자, 요일을 한달치 가져와서 column에 저장한다.
  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  // 달력 맨  위의 " < 현재 날짜 > " 의 기능을 구현한다. < 누르면 어제, > 누르면 내일, 현재 날짜를 누르면 날짜를 고를 수 있도록 해준다.
  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;

  // 달력에 적힌 날짜 하나하나를 누를 때 생기는 이벤트 담당
  const onPressDate = setSelectedDate;

  // 달력 화면을 그리는 컴포넌트이다. CalendarContext를 바로 받아서 default 함수의 return 부분에 작성할 수 도 있었지만, 이름을 바꿔서 가독성을 높였다.
  const ListHeaderComponent = () => (
    <View>
      <CalendarContext
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
      <Margin height={15} />

      <View
        style={{
          width: 20,
          height: 4,
          borderRadius: 4 / 2,
          backgroundColor: '#a3a3a3',
          alignSelf: 'center',
        }}
      />
      <Margin height={15} />
    </View>
  );

  // 캘린더 밑의 날짜 별 할 일 목록 구현부분
  // renderItem에 적은 내용이 list의 원소 하나 하나에 적용이 됨.

  // 해당 renderitem은 날짜 별로 적어놓은 할일을 받아서 짧게 누를 시, 해당 할 일의 체크 박스가 체크되고,
  // 길게 누를 시 해당 할 일이 삭제되도록 하였다.

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert('삭제하시겠어요?', '', [
        {
          style: 'cancel',
          text: '아니요',
        },
        {
          text: '네',
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          flexDirection: 'row',
          width: ITEM_WIDTH,
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: '#a6a6a6',
          // backgroundColor: todo.id % 2 === 0 ? "pink" : "lightblue",
        }}>
        <Text style={{ flex: 1, fontSize: 14, color: '#595959' }}>
          {todo.content}
        </Text>

        <Ionicons
          name="ios-checkmark"
          size={17}
          color={isSuccess ? '#595959' : '#bfbfbf'}
        />
      </Pressable>
    );
  };

  // 화면을 무리하게 끝까지 내렸을 때  튕겨져서 다시 화면이 내려오도록 하는 애니매이션이다. (폰 쓸 때 화면의 끝부분인데도 무리하게 내리면 나오는 애니매이션 가져옴.)
  const scrollToEnd = () => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };

  // 할 일 목록의 +버튼을 눌렀을 경우, 할일을 추가할 수 있도록 input을 비워주고, keyboard를 위로 띄운다.
  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };

  // ios에서 return이나, 안드로이드에서 enter를 눌렀을 경우 사용자가 적은 내용이 할 일 목록에 적히도록 하는 부분이다.
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onFocus = () => {
    scrollToEnd();
  };

  // 이건 로그 찍어볼려고 썼던 부분 필요 없는 내용
  useEffect(() => {
    runPracticeDayjs();
  }, []);

  // 화면에 나오는 메인 화면
  return (
    <Pressable
      style={styles.container}
      // onPress={() => Keyboard.dismiss()}
      onPress={Keyboard.dismiss}>
      {/* <TouchableOpacity activeOpacity={1}>

      </TouchableOpacity> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <>
          {/* 할 일목록을 구현하는 flatList HeaderComponent로 캘린더를 받음. */}
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingTop: statusBarHeight + 30,
            }}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format(
              'MM.D',
            )}에 추가할 MONEYQUEST!`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
