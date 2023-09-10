import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import AccountBookFeedback from './AccountBookFeedback';
import AccountBookProfile from './AccountBookProfile';
import FeedbackComment from './Feedback/FeedbackComment';
import { isFeedbackVisibleAtom } from '../recoil/accountBook';

const AccountBookUserInfo = props => {
  const isCommentVisible = useRecoilValue(isFeedbackVisibleAtom);
  return (
    <View style={{ width: '100%', marginTop: 20 }}>
      <Text>OO은 이렇게 소비했어요!</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* 소비 내역 요약  */}
        <AccountBookProfile />
        {/* 일일 피드백 */}
        <AccountBookFeedback />
        {/* 일일 거래 내역 조회 */}
      </View>
      {isCommentVisible && <FeedbackComment />}
    </View>
  );
};

export default AccountBookUserInfo;
