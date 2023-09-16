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
  const [memberInfoList, setMemberInfoList] = useRecoilState(familyMemberListAtom);
  const loggedInUser = useRecoilValue(loggedInUserAtom); // 로그인된 유저 정보

  // components states..
  // const [withoutUser, setWithoutUser] = useState([]);
  // const [renderingFamilyList, setRenderingFamilyList] = useState([]); // 실제로 그려줄 멤버들을 저장하는 배열

  // 가족 id 정보 받아오기
  useEffect(() => {
    const getFamilyMemberList = async () => {
      const result = await getFamilyMemberIdList(loggedInUser.id);
      setMemberIdList(result.usersId);
    };

    getFamilyMemberList();
  }, []);

  // console.log('memberID', memberIdList);

  // 가족 정보 받아오기
  useEffect(() => {
    const getUserInfoList = async () => {
      const userInfoList = [];
      for (let i = 0; i < memberIdList.length; i++) {
        const userInfo = await getUserInfo(memberIdList[i]);
        userInfoList.push(userInfo);
      }

      const withoutInfoList = userInfoList.filter(member => member.id !== loggedInUser.id);

      switch (pageInfo) {
        case 'AccountBook':
          setSelectedUserId(loggedInUser.id);
          break;
        case 'ManagingPocketMoney':
          setSelectedUserId(withoutInfoList[0].id);
      }

      setMemberInfoList([...userInfoList]);
    };

    getUserInfoList();
  }, [memberIdList]);

  // console.log('double api res', familyMemberList[0]);
  // console.log('withoutList', withoutUserList);
  // console.log('renderingList', renderingFamilyList);

  // const renderList = pageKind === 'AccountBook' ? [...familyMemberList]:]

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
          return <PocketMoneyMember user={member} key={`member-${index}`} />;
        }
      })}
    </View>
  );
};
// <FlatList
//   style={styles.familyList}
//   data={renderingFamilyList}
//   numColumns={renderingFamilyList.length}
//   keyExtractor={(_, index) => `member-${index}`}
//   renderItem={renderUserProfile}
// />
// { renderingFamilyList.map(member => <></>) }

const styles = StyleSheet.create({
  familyList: {
    flexDirection: 'row',
    // width: '40%',
    // marginBottom: 20,
    // backgroundColor: 'red',
  },
});

export default FamilyList;
