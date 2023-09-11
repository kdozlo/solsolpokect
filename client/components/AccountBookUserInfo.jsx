import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import AccountBookFeedback from './AccountBookFeedback';
import AccountBookProfile from './AccountBookProfile';
import FeedbackComment from './Feedback/FeedbackComment';
import FeedbackWriteComment from './Feedback/FeedbackWriteComment';
import ScoreDropdown from './Feedback/ScoreDropdown';
import { accountUserAtom, isFeedbackVisibleAtom } from '../recoil/accountBook';
import { dummyUser } from '../test/dummyData/user';

const commentText = '잘썼네';
const dailyScore = 4;
const isDailyScoreExist = !!dailyScore;
const isCommentExist = !!commentText;

const AccountBookUserInfo = ({ flatListRef }) => {
  const selectedUser = useRecoilValue(accountUserAtom);
  const isCommentVisible = useRecoilValue(isFeedbackVisibleAtom);
  const isOwnUser = selectedUser === dummyUser.userId;
  const isWriter = true; // comment 정보에 있는 작성자와 나(dummyUser.userId와 같은지 확인 필요)

  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <Text>{dummyUser.name}은 이렇게 소비했어요!</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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

export default AccountBookUserInfo;
