/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';

export const useQuestList = () => {
  const DATA = [
    {
      id: 1,
      type: date,
      setType: setDate,
      title: '목표 기한?',
      holder: '언제까지 이루면 될까요?',
    },
    {
      id: 2,
      type: missionName,
      setType: setMissionName,
      title: '무슨 도전을 할까?',
      holder: '도전할 미션을 적어주세요!',
    },

    {
      id: 3,
      type: reward,
      setType: setReward,
      title: '보상은 무엇이 좋을까?',
      holder: '보상은 뭘까요?',
    },
    {
      id: 4,
      type: name,
      setType: setName,
      title: '이 도전을 할 사람은?',
      holder: '도전할 사람의 이름을 적어주세요!',
    },
    {
      id: 5,
      type: appeal,
      setType: setAppeal,
      title: '남기고 싶은 메세지',
      holder: '해당 챌린지를 통해 가족들에게 하고 싶은 말을 적어주세요 ~.~',
    },
  ];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [dateInputVisible, setDateInputVisible] = useState(0);
  const [name, setName] = useState('');
  const [missionName, setMissionName] = useState('');
  const [reward, setReward] = useState('');
  const [appeal, setAppeal] = useState('');
  const [buttonColor, setButtonColor] = useState('#3D70FF');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
    setDateInputVisible(1);
  };

  const getGoalDate = () => {
    let newDate = new Date(date).toLocaleDateString();
    // console.log(newDate);

    return date !== '' ? newDate : '';
  };

  return {
    DATA,
    isDatePickerVisible,
    dateInputVisible,
    showDatePicker,
    handleConfirm,
    hideDatePicker,
    getGoalDate,
    buttonColor,
    setButtonColor,
  };
};
