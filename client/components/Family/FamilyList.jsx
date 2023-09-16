import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, Animated, FlatList, StyleSheet } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import AccountBookMember from './AccountBookMember';
import PocketMoneyMember from './PocketMoneyMember';
import { images } from '../../constants';
import { accountUserAtom, familyMemberApiResAtom, familyMemberListAtom } from '../../recoil/accountBook';
import { loggedInUserAtom } from '../../recoil/user';
import { getFamilyInfo, getFamilyMemberIdList } from '../../services/apis/familyAPI';
import { getUserInfo } from '../../services/apis/userAPI';
import { dummyUser, dummyUsers } from '../../test/dummyData/user';
import { SOLSOL_URL } from '../../utils/const/api';

// FlatList 사용도로고 리팩터링
const FamilyList = ({ pageInfo, memberApiRes }) => {
  // recoil states..
  const setSelectedUserId = useSetRecoilState(accountUserAtom); // 현재 선택된 유저로 보여줄 유저의 id
  // const [memberApiRes, setMemberApiRes] = useRecoilState(familyMemberApiResAtom);
  const [memberInfoList, setMemberInfoList] = useRecoilState(familyMemberListAtom);
  const loggedInUser = useRecoilValue(loggedInUserAtom); // 로그인된 유저 정보

  // 가족 id 정보 받아오기
  // useEffect(() => {
  //   const getFamilyMemberList = async () => {
  //     const result = await getFamilyMemberIdList(loggedInUser.id);
  //     setMemberApiRes(result);
  //   };

  //   getFamilyMemberList();
  // }, []);

  // console.log('memberID', memberIdList);

  // 가족 정보 받아오기
  useEffect(() => {
    const getUserInfoList = async () => {
      const apiResList = [];
      for (let i = 0; i < memberApiRes.usersId.length; i++) {
        const userInfoRes = await getUserInfo(memberApiRes.usersId[i]);
        apiResList.push(userInfoRes);
      }

      const withoutInfoList = apiResList.filter(member => member.id !== loggedInUser.id);
      const memberInfoList = [loggedInUser, ...withoutInfoList];

      switch (pageInfo) {
        case 'AccountBook':
          setSelectedUserId(loggedInUser.id);
          break;
        case 'ManagingPocketMoney':
          setSelectedUserId(withoutInfoList[0].id);
      }

      setMemberInfoList([...memberInfoList]);
    };

    getUserInfoList();
  }, [memberApiRes]);

  // 선택된 유저는 transition을 통해서 좀 더 크게 표현하기 + 티어 높은 순으로 표현
  const renderUserProfile = ({ item }) => {
    const user = item;
    // console.log(user);
    switch (pageInfo) {
      case 'AccountBook':
        return <AccountBookMember user={user} />;
      case 'ManagingPocketMoney':
        return <PocketMoneyMember user={user} />;
    }
  };

  return (
    <View style={styles.familyList}>
      {memberInfoList.map((member, index) => {
        if (pageInfo == 'AccountBook') {
          return <AccountBookMember user={member} key={`member-${index}`} />;
        } else {
          if (member.id === loggedInUser.id) {
            return <></>;
          }
          return <PocketMoneyMember user={member} key={`member-${index}`} />;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  familyList: {
    width: '60%',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    // flex: 1,
    // width: '40%',
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
});

export default FamilyList;
