import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { useRecoilState } from 'recoil';

import ScoreDropdown from './ScoreDropdown';
import { ScrollHeightAtom } from '../../recoil/accountBook';

const FeedbackWriteComment = () => {
  const [currentHeight, setCurrentHeight] = useRecoilState(ScrollHeightAtom);

  const handleFeedbackBtnHeight = e => {
    if (!currentHeight) {
      setCurrentHeight(pre => {
        return e.nativeEvent.layout.y;
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
      }}
      onLayout={handleFeedbackBtnHeight}>
      <ScoreDropdown />
      <TextInput style={{ flex: 4, marginLeft: 10 }} placeholder="피드백을 남겨주세요"></TextInput>
    </View>
  );
};

export default FeedbackWriteComment;
