/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import { images } from '../constants/index';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MakingQuest from './MakingQuest';

export default ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.fullScreen}>
      <View>
        <Image source={images.whiteBear} style={styles.forImage} />
        <Text style={styles.forTitle}> 어떤 도전을 할까?! </Text>
      </View>
      <View style={styles.forInnerView}>
        <TouchableOpacity
          style={styles.forTouchable}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('MakingQuest', { type: 2 });
          }}>
          <FontAwesome name="camera" size={100} color="#ffffff" />
          <Text style={styles.forButtonText}>인증 챌린지!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forTouchable}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('MakingQuest', { type: 1 });
          }}>
          <MaterialIcons name="attach-money" size={100} color="#ffffff" />
          <Text style={styles.forButtonText}> 머니 챌린지!</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 3,
    backgroundColor: '#AAEBFF',
    justifyContent: 'space-around',
  },
  forImage: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  forTitle: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 50,
    marginTop: 10,
    marginBottom: 20,
  },

  forInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  forTouchable: { alignItems: 'center' },
  forButtonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
