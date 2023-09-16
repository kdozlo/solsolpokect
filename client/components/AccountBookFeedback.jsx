import React, { useRef } from 'react';
import { Text, View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ScrollHeightAtom, isFeedbackVisibleAtom } from '../recoil/accountBook';

const AccountBookFeedback = ({ flatListRef, isWriter, dailyScore }) => {
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
    <TouchableOpacity disabled={!isWriter} style={styles.container} onPress={handleFeedbackPress}>
      <View style={styles.textBox}>
        <Text>오늘의</Text>
        <Text>점수</Text>
      </View>
      <Text style={styles.score}>{dailyScore}점</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  textBox: {
    marginRight: 20,
    // textAlign: 'center',
    alignItems: 'center',
  },
  score: {
    fontSize: 20,
    fontWeight: 700,
  },
});

export default AccountBookFeedback;
