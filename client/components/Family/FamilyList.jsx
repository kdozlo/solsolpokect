import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, TouchableWithoutFeedback, Animated, FlatList, StyleSheet } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import AccountBookMember from './AccountBookMember';
import PocketMoneyMember from './PocketMoneyMember';
import { images } from '../../constants';
import { accountUserAtom, familyMemberIdListAtom, familyMemberListAtom } from '../../recoil/accountBook';
import { loggedInUserAtom } from '../../recoil/user';
import { getFamilyInfo, getFamilyMemberIdList } from '../../services/apis/familyAPI';
import { getUserInfo } from '../../services/apis/userAPI';
import { dummyUser, dummyUsers } from '../../test/dummyData/user';
import { SOLSOL_URL } from '../../utils/const/api';

// FlatList 사용도로고 리팩터링
const FamilyList = ({ pageInfo }) => {
  // recoil states..
  const setSelectedUserId = useSetRecoilState(accountUserAtom); // 현재 선택된 유저로 보여줄 유저의 id
  const [memberIdList, setMemberIdList] = useRecoilState(familyMemberIdListAtom);
  const [familyMemberList, setFamilyMemberList] = useRecoilState(familyMemberListAtom); // 가족 정보 저장 배열
  const loggedInUser = useRecoilValue(loggedInUserAtom); // 로그인된 유저 정보

  // components states..
  const [withoutUserList, setWithoutUserList] = useState([]);
  const [renderingFamilyList, setRenderingFamilyList] = useState([]); // 실제로 그려줄 멤버들을 저장하는 배열

  const getRenderingMembers = async () => {
    switch (pageInfo) {
      case 'AccountBook':
        setSelectedUserId(loggedInUser.id);
        setRenderingFamilyList([loggedInUser, ...withoutUserList]);
        break;
      case 'ManagingPocketMoney':
        console.log('firstUser', withoutUserList);
        // setSelectedUserId(withoutUserList[0].id);
        // setRenderingFamilyList([...withoutUserList]);
        break;
      default:
        setSelectedUserId(loggedInUser.id);
        setRenderingFamilyList([loggedInUser, ...withoutUserList]);
    }
  };

  useEffect(() => {
    // 가족 정보 받아오기
    const getFamilyMemberList = async () => {
      // api 정보 저장
      const result = await getFamilyMemberIdList(loggedInUser.id);
      // setMemberIdList(result);

      console.log('userInfo in getUserInfo', result);
      for (let i = 0; i < result.length; i++) {
        console.log('memberID', result[i]);
        //   const userInfo = await getUserInfo(memberIdList(i));
        //   console.log('userInfo in getUserInfo', userInfo);
        //   setFamilyMemberList(pre => [...pre, userInfo]);
      }
    };

    getFamilyMemberList();
  }, []);

  useEffect(() => {
    const getUserInfoList = async id => {
      // console.log('userInfo in getUserInfo', memberIdList);
      // const userInfo = await getUserInfo(6);
      // console.log('userInfo in getUserInfo', userInfo);
      // for (let i = 0; i < memberIdList.length; i++) {
      //   console.log('memberID', memberIdList[i]);
      //   const userInfo = await getUserInfo(memberIdList(i));
      //   console.log('userInfo in getUserInfo', userInfo);
      //   setFamilyMemberList(pre => [...pre, userInfo]);
      // }
    };

    getUserInfoList();
  }, []);

  // console.log('withoutUserList', withoutUserList);
  // let renderingFamilyList;

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
