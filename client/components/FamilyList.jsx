import React, { useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { images } from '../constants';
import { accountUserAtom } from '../recoil/accountBook';
import { dummyUser, dummyUsers } from '../test/dummyData/user';

const FamilyList = props => {
  const [selectedUser, setSelectedUser] = useRecoilState(accountUserAtom);

  // 선택된 유저는 transition을 통해서 좀 더 크게 표현하기 + 티어 높은 순으로 표현
  const renderUserProfile = user => {
    return (
      <TouchableWithoutFeedback
        disabled={false}
        key={user.userId}
        onPress={() => {
          console.log(selectedUser);
          setSelectedUser(prev => {
            return user.userId;
          });
        }}>
        <ProfileInfo>
          <Image source={images.father} />
          <Text>{user.name}</Text>
        </ProfileInfo>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <List>
      {renderUserProfile(dummyUser)}
      {dummyUsers
        .filter(user => dummyUser.userId !== user.userId)
        .map(user => {
          return renderUserProfile(user);
        })}
    </List>
  );
};

const List = styled.View`
  flex-direction: row;
  align-self: flex-start;
  margin-bottom: 20px;
`;

// selectedUser에 따라서 transition 사용해서 크게 보여주기
const ProfileInfo = styled.View`
  flex-direction: col;
`;

export default FamilyList;
