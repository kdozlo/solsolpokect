// 버튼에 필요한 값들, type, icon, name

import { useState } from 'react';

// type:1 -> moneyChallenge, type: 2 -> 사진 인증 퀘스트

const DATA = [
  {
    id: 1,
    type: 1,
    name: 'MONEY QUEST!',
  },
  {
    id: 2,
    type: 2,
    name: 'CERTIFY QUEST',
  },
  {
    id: 3,
    type: -1,
    name: 'MORE QUEST?',
  },
];

export const FlatListData = () => {
  return {
    DATA,
  };
};
