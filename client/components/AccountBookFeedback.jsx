import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ScrollHeightAtom, isFeedbackVisibleAtom } from '../recoil/accountBook';

const FEEDBACK_SCORE = 5;

const AccountBookFeedback = ({ flatListRef }) => {
  const [isCommentVisible, setIsCommentVisible] = useRecoilState(isFeedbackVisibleAtom);
  const currentHeight = useRecoilValue(ScrollHeightAtom);

  // Event Handler
  const handleFeedbackPress = () => {
    if (!isCommentVisible) {
      flatListRef.current.scrollToOffset({
        offset: currentHeight,
        animated: true,
      });
    }
    setIsCommentVisible(prev => !prev);
  };

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'pink',
      }}
      onPress={handleFeedbackPress}>
      <View style={{ marginRight: 20 }}>
        <Text>오늘의</Text>
        <Text>점수</Text>
      </View>
      <Text>{FEEDBACK_SCORE}점</Text>
    </TouchableOpacity>
  );
};

export default AccountBookFeedback;
