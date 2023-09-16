/* eslint-disable prettier/prettier */
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Appearance,
  Button,
  Image,
} from 'react-native';

import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { useQuestList } from '../hooks/use-questList';
import { images } from '../constants';

const icons = {
  1: images.GoalTitle,
  2: images.RewardScore,
  3: images.DetailTitle,
};

export default ({ navigation, route }) => {
  const { goal, missionName, picture, reward } = route.params;
  const DATA = [
    {
      id: 1,
      content: missionName,
    },
    {
      id: 2,
      content: reward,
    },

    {
      id: 3,
      content: goal,
    },
  ];

  const renderItem = ({ item: { id, content } }) => {
    return (
      <View style={styles.forView}>
        <Image source={icons[id]} style={{ width: 200, height: 50 }} />
        <Text style={styles.forText}>{content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.forFullScreen}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      <TouchableOpacity
        style={styles.forLastButton}
        onPress={() => {
          navigation.navigate(`Main`);
        }}>
        <Text style={styles.forLastText}> 홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forFullScreen: {
    flex: 1,
  },

  forView: {
    flex: 3,
    paddingTop: 20,
    paddingBottom: 20,
  },
  forText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 13,
    fontStyle: 'italic',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: '#3D70FF',
    borderRadius: 20,
  },
  buttonContainer: {
    backgroundColor: '#3D70FF',
  },
  forLastButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3D70FF',
    alignSelf: 'center',
    borderRadius: 50,
    width: 200,
    marginBottom: 50,
  },
  forLastText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
