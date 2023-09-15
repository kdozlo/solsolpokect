import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import AccountBookMember from './AccountBookMember';
import PocketMoneyMember from './PocketMoneyMember';
import { images } from '../../constants';
import { accountUserAtom } from '../../recoil/accountBook';
import { dummyUser, dummyUsers } from '../../test/dummyData/user';

// FlatList 사용도로고 리팩터링
const FamilyList = ({ pageInfo }) => {
  const withoutUserList = dummyUsers.filter(user => dummyUser.userId !== user.userId);
  let renderingFamilyList;

  switch (pageInfo) {
    case 'AccountBook':
      renderingFamilyList = [dummyUser, ...withoutUserList];
      break;
    case 'ManagingPocketMoney':
      renderingFamilyList = [...withoutUserList];
      break;
    default:
      renderingFamilyList = [dummyUser, ...withoutUserList];
  }

  // 선택된 유저는 transition을 통해서 좀 더 크게 표현하기 + 티어 높은 순으로 표현
  const renderUserProfile = user => {
    switch (pageInfo) {
      case 'AccountBook':
        return <AccountBookMember user={user} />;
      case 'ManagingPocketMoney':
        return <PocketMoneyMember user={user} />;
    }
  };

  return (
    <List>
      {renderingFamilyList.map(user => {
        return renderUserProfile(user);
      })}
    </List>
  );
};

const List = styled.View`
  width: 40%;
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export default FamilyList;
