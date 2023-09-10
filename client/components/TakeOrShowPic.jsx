/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { Entypo } from '@expo/vector-icons';
import { Button, Image } from 'react-native';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');

export default ({ onPress, photoAlready, navigation, image }) => {
  if (!photoAlready) {
    return (
      <TouchableOpacity style={styles.touchable} onPress={() => onPress()}>
        <Entypo
          name="camera"
          size={100}
          color="#3D70FF"
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <Image
        source={{ uri: image }}
        style={{
          width: WIDTH / 4,
          height: HEIGHT / 4,
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  touchable: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
  },
});
