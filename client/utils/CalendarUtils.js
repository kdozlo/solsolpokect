import dayjs from 'dayjs';
import { Dimensions } from 'react-native';
import {
  getStatusBarHeight,
  getBottomSpace,
} from 'react-native-iphone-x-helper';

const WIDTH = Dimensions.get('screen').width;

export const statusBarHeight = getStatusBarHeight(true);
export const bottomSpace = getBottomSpace();
export const ITEM_WIDTH = WIDTH / 2;

export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0);

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get('day'); // 화 2
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, 'day');
    filledColumns.unshift(date);
  }

  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get('day');

  for (let i = 1; i <= 6 - endDay; i += 1) {
    const date = dayjs(end).add(i, 'day');
    filledColumns.push(date);
  }

  return filledColumns;
};
export const getCalendarColumns = now => {
  const start = dayjs(now).startOf('month'); // 11.1
  const end = dayjs(now).endOf('month'); // 11.30
  const endDate = dayjs(end).get('date'); // 30

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, 'day');
    columns.push(date);
  }

  const filledColumns = fillEmptyColumns(columns, start, end);

  return filledColumns;
};

/**
 * @param day 0 ~ 6
 * @return 일~월
 */
const dayTexts = ['일', '월', '화', '수', '목', '금', '토'];
export const getDayText = day => {
  /* Ex 1 */
  return dayTexts[day];
};

export const getDayColor = day => {
  /* Ex 1 */
  return day === 0 ? '#e67639' : day === 6 ? '#5872d1' : '#2b2b2b';
};

// 해당 일자가 속한 달의 일자, 첫날, 끝날을 dayjs 객체로부터 추출함.
// -> default로는 today를 getCalendarColumns에 넣어서 수행
export const generateDate = date => {
  const firstDate = dayjs(date).startOf('month'); // 첫날 : 9.1
  const lastDate = dayjs(date).endOf('month'); // 끝날 : 9.30
  const numberOfMonth = dayjs(lastDate).get('date'); // 달의 일자 : 30

  const arrayOfDate = [];

  // 전달 날짜이면서 이번 달에 표시되는 날짜들 생성
  const firstDay = dayjs(firstDate).get('day');
  for (let i = 1; i <= firstDay; i++) {
    const prefixDate = dayjs(firstDate).subtract(i, 'day');
    arrayOfDate.unshift(prefixDate);
  }

  // 이번 달에 해당하는 날짜들 생성
  for (let i = 0; i < numberOfMonth; i += 1) {
    const date = dayjs(firstDate).add(i, 'day');
    arrayOfDate.push(date);
  }

  const lastDay = dayjs(lastDate).get('day');
  for (let i = 1; i <= 6 - lastDay; i += 1) {
    const postDate = dayjs(lastDate).add(i, 'day');
    arrayOfDate.push(postDate);
  }

  return arrayOfDate;
};
