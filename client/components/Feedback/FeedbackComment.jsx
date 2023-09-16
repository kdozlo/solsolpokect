import { Image, StyleSheet, Text, View } from 'react-native';

import { images } from '../../constants';

const FeedbackComment = ({ commentText }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.father} />
      <Text>{commentText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  image: { marginRight: 5 },
});

export default FeedbackComment;
