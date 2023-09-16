import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import AccountBookFeedback from './AccountBookFeedback';
import AccountBookProfile from './AccountBookProfile';
import FeedbackComment from './Feedback/FeedbackComment';
import FeedbackWriteComment from './Feedback/FeedbackWriteComment';
import ScoreDropdown from './Feedback/ScoreDropdown';
import { accountUserAtom, isFeedbackVisibleAtom } from '../recoil/accountBook';
import { loggedInUserAtom, selectedUserInfoAtom } from '../recoil/user';
import { getUserInfo } from '../services/apis/userAPI';
import { dummyUser } from '../test/dummyData/user';

const commentText = '잘썼네';
const dailyScore = 4;
const isDailyScoreExist = !!dailyScore;
const isCommentExist = !!commentText;

const AccountBookUserInfo = ({ flatListRef }) => {
  // const [selectedUserInfo, setSelectedUserInfo] = useRecoilState(selectedUserInfoAtom);
  const selectedUserId = useRecoilValue(accountUserAtom);
  const isCommentVisible = useRecoilValue(isFeedbackVisibleAtom);
  const loggedInUser = useRecoilValue(loggedInUserAtom);

  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const isOwnUser = selectedUserId === loggedInUser.id;
  const isWriter = true; // comment 정보에 있는 작성자와 나(dummyUser.userId와 같은지 확인 필요)

  // 용돈 줄 사람의 정보 받아오기
  const getSelectedUserInfo = async () => {
    // console.log(selectedUserId);
    const result = await getUserInfo(selectedUserId);
    setSelectedUserInfo(result);
  };
  useEffect(() => {
    getSelectedUserInfo();
  }, [selectedUserId]);

  console.log('selectedUserInfo', selectedUserInfo);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{'신한'}은 이렇게 소비했어요!</Text>
      <View style={styles.userInfo}>
        {/* 소비 내역 요약  */}
        <AccountBookProfile />
        {/* 일일 피드백*/}
        {isDailyScoreExist && (
          <AccountBookFeedback flatListRef={flatListRef} isWriter={isWriter} dailyScore={dailyScore} />
        )}
        {/* 일일 거래 내역 조회 */}
      </View>

      {isWriter && isCommentVisible && <FeedbackWriteComment commentText={commentText} dailyScore={dailyScore} />}
      {isCommentExist && !isCommentVisible && <FeedbackComment commentText={commentText} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 20 },
  headerText: {
    fontWeight: 700,
  },
  userInfo: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default AccountBookUserInfo;
