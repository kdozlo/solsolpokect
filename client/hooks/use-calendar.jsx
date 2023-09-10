import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { accountDateAtom, isPickerVisibleAtom } from '../recoil/accountBook';

export const useCalendar = now => {
  const [selectedDate, setSelectedDate] = useRecoilState(accountDateAtom);
  const [isDatePickerVisible, setDatePickerVisibility] =
    useRecoilState(isPickerVisibleAtom);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const subtract1Month = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
    setSelectedDate(newSelectedDate);
  };
  const add1Month = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, 'month');
    setSelectedDate(newSelectedDate);
  };

  return {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  };
};
