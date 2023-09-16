/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Alert } from 'react-native';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import UserInfo, {
  DB_KEYState,
  QuestListState,
  appealState,
  missionNameState,
  nameListState,
  nameState,
  rewardState,
  URL,
} from '../recoil/UserInfo';
import axios from 'axios';

const ASYNC_KEY = {
  QUESTLIST: 'questList',
};

export const useQuestList = () => {
  const { nameList, setNameList, missionName, setMissionName, reward, setReward, appeal, setAppeal } = UserInfo();

  const DB_KEY = useRecoilValue(DB_KEYState);

  // 가족 정보를 리스트에서 하나씩 빼와서 만드는 함수
  const getFamilyInfo = async () => {
    await axios
      .get(`http://${URL}/api/family/info/${DB_KEY}`)
      .then(function (response) {
        const v = response.request._response;
        const ParsedV = JSON.parse(v);

        const id = ParsedV.data.usersId;
        const usersName = ParsedV.data.usersName;
        const roles = ParsedV.data.roles;

        console.log(id.length);

        const familyList = [];

        for (let i = 0; i < id.length; i++) {
          let element1 = id[i];
          let element2 = usersName[i];
          let element3 = roles[i];

          const newArray = [element1, element2, element3];

          console.log(newArray);

          familyList.push(newArray);
        }

        setNameList(familyList);

        console.log(nameList);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  const DATA = [
    // {
    //   id: 1,
    //   type: date,
    //   title: '목표 기한?',
    //   holder: '언제까지 이루면 될까요?',
    // },
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
      type: nameList,
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
    setNameList,
    setMissionName,
    setReward,
    setAppeal,
    nameList,
    missionName,
    reward,
    appeal,
    getFamilyInfo,
  };
};
