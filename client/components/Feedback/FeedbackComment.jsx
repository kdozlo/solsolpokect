import React from 'react';
import { Text, View } from 'react-native';
import { useRecoilState } from 'recoil';

import { ScrollHeightAtom } from '../../recoil/accountBook';

const FeedbackComment = ({ scrollViewRef }) => {
  const [currentHeight, setCurrentHeight] = useRecoilState(ScrollHeightAtom);

  const handleFeedbackBtnHeight = e => {
    if (!currentHeight) {
      setCurrentHeight(pre => {
        return e.nativeEvent.layout.y;
      });
    }
  };

  return (
    <View onLayout={handleFeedbackBtnHeight}>
      <Text>Feedback View</Text>
    </View>
  );
};

export default FeedbackComment;
