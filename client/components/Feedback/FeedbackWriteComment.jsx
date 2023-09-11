import React from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import ScoreDropdown from './ScoreDropdown';
import { ScrollHeightAtom, isFeedbackVisibleAtom } from '../../recoil/accountBook';

const FeedbackWriteComment = ({ commentText, dailyScore }) => {
  const [currentHeight, setCurrentHeight] = useRecoilState(ScrollHeightAtom);
  const setIsFeedbackVisible = useSetRecoilState(isFeedbackVisibleAtom);

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
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
      }}
      onLayout={handleFeedbackBtnHeight}>
      <ScoreDropdown dailyScore={dailyScore} />
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={{ flex: 4, marginLeft: 10 }} placeholder="피드백을 남겨주세요">
          {commentText}
        </TextInput>
        <Pressable
          onPress={() => {
            setIsFeedbackVisible(false);
            // 추가되거나 수정된 text를 반영해주는 작업이 필요
            // 백엔드로 api 보내고 다시 정보를 받아오는 작업이 필요
          }}>
          <Text>확인</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FeedbackWriteComment;
