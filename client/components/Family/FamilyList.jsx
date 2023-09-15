import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, Animated, FlatList, StyleSheet } from 'react-native';
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
  const renderUserProfile = ({ item }) => {
    switch (pageInfo) {
      case 'AccountBook':
        return <AccountBookMember user={item} />;
      case 'ManagingPocketMoney':
        return <PocketMoneyMember user={item} />;
    }
  };

  return (
    <FlatList
      style={styles.familyList}
      data={renderingFamilyList}
      numColumns={renderingFamilyList.length}
      keyExtractor={(_, index) => `member-${index}`}
      renderItem={renderUserProfile}
    />
  );
};

const styles = StyleSheet.create({
  familyList: {
    width: '40%',
    marginBottom: 20,
    backgroundColor: 'red',
  },
});

export default FamilyList;
