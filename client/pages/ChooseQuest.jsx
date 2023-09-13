/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import { View, Text, Pressable, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { images } from '../constants/index';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import MakingQuest from './MakingQuest';

const icons = {
  0: images.background,
  1: images.MoneyCloud,
  2: images.CameraCloud,
};

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
          <Image source={icons[2]} style={styles.forImage} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forTouchable}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('MakingQuest', { type: 1 });
          }}>
          <Image source={icons[1]} style={styles.forImage} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 3,
    backgroundColor: '#AAEBFF',
    justifyContent: 'space-between',
  },
  forImage: {
    alignSelf: 'center',
    width: 300,
    height: 300,
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
