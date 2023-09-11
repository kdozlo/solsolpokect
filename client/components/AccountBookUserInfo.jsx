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

const AccountBookUserInfo = ({ flatListRef }) => {
  const selectedUser = useRecoilValue(accountUserAtom);
  const isCommentVisible = useRecoilValue(isFeedbackVisibleAtom);
  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <Text>{dummyUser.name}은 이렇게 소비했어요!</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* 소비 내역 요약  */}
        <AccountBookProfile />
        {/* 일일 피드백 */}
        <AccountBookFeedback flatListRef={flatListRef} />
        {/* 일일 거래 내역 조회 */}
      </View>
      {isCommentVisible && <FeedbackWriteComment />}
      {selectedUser === dummyUser.userId ? <FeedbackComment /> : <></>}
    </View>
  );
};

export default AccountBookUserInfo;
