import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

import { accountDateAtom, isPickerVisibleAtom } from '../recoil/accountBook';

export const useDatePicker = callbackFunc => {
  const [isDatePickerVisible, setDatePickerVisibility] = useRecoilState(isPickerVisibleAtom);
  const [selectedDate, setSelectedDate] = useRecoilState(accountDateAtom);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
    callbackFunc();
  };

  return {
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
  };
};
