import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ScrollHeightAtom, isFeedbackVisibleAtom } from '../recoil/accountBook';

const AccountBookFeedback = ({ scrollViewRef }) => {
  const [isCommentVisible, setIsCommentVisible] = useRecoilState(isFeedbackVisibleAtom);
  const currentHeight = useRecoilValue(ScrollHeightAtom);
  // console.log(scrollViewRef.current);

  // Event Handler
  const handleFeedbackPress = () => {
    if (!isCommentVisible) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: currentHeight,
        animated: true,
      });
    }
    setIsCommentVisible(prev => !prev);
  };

  return (
    <TouchableOpacity onPress={handleFeedbackPress}>
      <Text>피드백 컴포넌트</Text>
    </TouchableOpacity>
  );
};

export default AccountBookFeedback;
