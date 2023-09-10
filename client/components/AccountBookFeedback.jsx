import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useSetRecoilState } from 'recoil';

import { isFeedbackVisibleAtom } from '../recoil/accountBook';

const AccountBookFeedback = props => {
  const setIsCommentVisible = useSetRecoilState(isFeedbackVisibleAtom);

  // Event Handler
  const handleFeedbackPress = () => {
    setIsCommentVisible(prev => !prev);
    // Todo: 화면 feedbackComment 컴포넌트로 scroll 되도록 처리 필요
  };

  return (
    <TouchableOpacity onPress={handleFeedbackPress}>
      <Text>피드백 컴포넌트</Text>
    </TouchableOpacity>
  );
};

export default AccountBookFeedback;
