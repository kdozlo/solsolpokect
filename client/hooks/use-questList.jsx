/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const ASYNC_KEY = {
  QUESTLIST: 'questList',
};

export const QuestListState = atom({
  key: 'QuestListState',
  default: [
    {
      id: -1,
      type: 3,
    },
  ],
});

export const nameState = atom({
  key: 'nameState',
  default: '',
});
export const missionNameState = atom({
  key: 'missionNameState',
  default: '',
});
export const rewardState = atom({
  key: 'rewardState',
  default: '',
});
export const appealState = atom({
  key: 'appealState',
  default: '',
});

export const useQuestList = () => {
  const DATA = [
    {
      id: 1,
      type: date,
      title: '목표 기한?',
      holder: '언제까지 이루면 될까요?',
    },
    {
      id: 2,
      type: missionName,
      title: '무슨 도전을 할까?',
      holder: '도전할 미션을 적어주세요!',
    },

    {
      id: 3,
      type: reward,
      title: '보상은 무엇이 좋을까?',
      holder: '보상은 뭘까요?',
    },
    {
      id: 4,
      type: name,
      title: '이 도전을 할 사람은?',
      holder: '도전할 사람의 이름을 적어주세요!',
    },
    {
      id: 5,
      type: appeal,
      title: '남기고 싶은 메세지',
      holder: '해당 챌린지를 통해 가족들에게 하고 싶은 말을 적어주세요 ~.~',
    },
  ];

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [dateInputVisible, setDateInputVisible] = useState(0);
  const [name, setName] = useRecoilState(nameState);
  const [missionName, setMissionName] = useRecoilState(missionNameState);
  const [reward, setReward] = useRecoilState(rewardState);
  const [appeal, setAppeal] = useRecoilState(appealState);

  const questList = useRecoilValue(QuestListState);
  const setQuestList = useSetRecoilState(QuestListState);

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

    return date !== '' ? newDate : '';
  };

  const storeAndsetQuestList = newQuestList => {
    setQuestList(newQuestList);
    AsyncStorage.setItem(ASYNC_KEY.QUESTLIST, JSON.stringify(newQuestList));
    // console.log(questList);
  };

  const deleteList = listId => {
    Alert.alert('해당 과제를 삭제하시겠습니까?', '', [
      {
        style: 'cancel',
        text: '아니요!',
      },

      {
        text: '네!',
        onPress: () => {
          const filteredList = questList.filter(list => list.id !== listId);
          setQuestList(filteredList);
          AsyncStorage.setItem(ASYNC_KEY.QUESTLIST, JSON.stringify(filteredList));
        },
      },
    ]);
  };

  const initList = async () => {
    const defaultList = {
      id: -1,
      type: 3,
    };
    const listFromStroage = await AsyncStorage.getItem(ASYNC_KEY.QUESTLIST);

    if (listFromStroage !== null) {
      const parsedList = JSON.parse(listFromStroage);
      setQuestList([...parsedList]);
    }
  };

  useEffect(() => {
    initList();
  }, []);

  return {
    DATA,
    isDatePickerVisible,
    dateInputVisible,
    showDatePicker,
    handleConfirm,
    hideDatePicker,
    getGoalDate,
    questList,
    storeAndsetQuestList,
    deleteList,
    setName,
    setMissionName,
    setReward,
    setAppeal,
    name,
    missionName,
    reward,
    appeal,
  };
};
