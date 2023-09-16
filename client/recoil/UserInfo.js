/* eslint-disable prettier/prettier */
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// 사용자 정보에 대한 상태관리 담당

export const URL = '3.38.106.28:8080';

export const DB_KEYState = atom({
  key: 'DB_KEYState',
  default: '',
});

export const usernameState = atom({
  key: 'usernameState',
  default: '',
});

export const userIdState = atom({
  key: 'userIdState',
  default: '',
});

export const userPasswordState = atom({
  key: 'userPasswordState',
  default: '',
});

export const userRoleState = atom({
  key: 'userRoleState',
  default: '',
});

export const userAccountState = atom({
  key: 'userAccountState',
  default: 0,
});

export const userFamilyIdState = atom({
  key: 'userFamilyIdState',
  default: '',
});

export const userCreditScoreState = atom({
  key: 'userCreditScoreState',
  default: '',
});

export const QuestListState = atom({
  key: 'QuestListState',
  default: [
    {
      id: -1,
      type: 3,
    },
  ],
});

// 미션 내용 상태관리 담당
export const nameListState = atom({
  key: 'namListState',
  default: [],
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

export default () => {
  const [userId, setuserId] = useRecoilState(userIdState);

  const [nameList, setNameList] = useRecoilState(nameListState);
  const [missionName, setMissionName] = useRecoilState(missionNameState);
  const [reward, setReward] = useRecoilState(rewardState);
  const [appeal, setAppeal] = useRecoilState(appealState);
  const [userPassword, setUserPassword] = useRecoilState(userPasswordState);

  return {
    nameList,
    setNameList,
    missionName,
    setMissionName,
    reward,
    setReward,
    appeal,
    setAppeal,
    userId,
    setuserId,
    userPassword,
    setUserPassword,
    URL,
  };
};
