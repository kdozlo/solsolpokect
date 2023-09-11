import { Image, Text, View } from 'react-native';

import { images } from '../../constants';

const FeedbackComment = ({ commentText }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={images.father} />
      <Text>{commentText}</Text>
    </View>
  );
};

export default FeedbackComment;
