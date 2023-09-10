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
} from 'react-native';

import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { useQuestList } from '../hooks/use-questList';

export default ({ navigation }) => {
  const DATA = [
    {
      id: 1,
      title: '목표 기한',
      content: 'text value',
    },
    {
      id: 2,
      title: '도전 내용',
      content: 'text value',
    },

    {
      id: 3,
      title: '보상이 여러분을 기다려요...',
      content: 'text value',
    },
    {
      id: 4,
      title: '도전자',
      content: 'text value',
    },
    {
      id: 5,
      title: '퀘스트 NPC가 남긴 말...',
      content: 'text value',
    },
  ];

  const renderItem = ({ item: { title, content } }) => {
    return (
      <View style={styles.forView}>
        <Text style={styles.forText}>{title}</Text>
        <Text style={styles.forText}>{content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.forFullScreen}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
