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
  Alert,
} from 'react-native';

import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { useQuestList } from '../hooks/use-questList';

/* eslint-disable prettier/prettier */
export default ({ navigation, route }) => {
  const { type } = route.params;

  const {
    DATA,
    isDatePickerVisible,
    dateInputVisible,
    showDatePicker,
    handleConfirm,
    hideDatePicker,
    getGoalDate,
    questList,
    storeAndsetQuestList,
    name,
    missionName,
    reward,
    appeal,
    setName,
    setMissionName,
    setReward,
    setAppeal,
  } = useQuestList();

  const addQuestList = () => {
    const lastId = questList.length === 0 ? 0 : questList[questList.length - 1].id;

    const newQuest = {
      id: lastId + 1,
      type,
      date: getGoalDate(),

      name,
      missionName,
      reward,
      appeal,
    };

    storeAndsetQuestList([newQuest, ...questList]);
  };

  const renderItem = ({ item: { id, type, setType, holder, title } }) => {
    if (id === 1) {
      return (
        <View style={styles.forView}>
          <Text style={styles.forText}>{title}</Text>
          <View
            style={{
              backgroundColor: '#007AFF',
              width: 150,
              marginTop: 20,
              marginLeft: 20,
              borderRadius: 50,
            }}>
            <Button title="날짜 정하기!" color="#ffffff" onPress={showDatePicker} />
          </View>

          <TextInput
            style={[styles.input, { opacity: dateInputVisible }]}
            onChangeText={setType}
            value={getGoalDate()}
            placeholder={holder}
            onEndEditing={() => {}}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      );
    }

    if (id === 5) {
      return (
        <View style={styles.forView}>
          <Text style={styles.forText}>{title}</Text>
          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                borderTopWidth: 1,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: '#3D70FF',
              },
            ]}
            onChangeText={setAppeal}
            value={type}
            placeholder={holder}
            editable
            multiline={true}
            numberOfLines={10}
            maxLength={40}
          />
        </View>
      );
    }

    return (
      <View style={styles.forView}>
        <Text style={styles.forText}>{title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={id === 2 ? setMissionName : id === 3 ? setReward : setName}
          value={type}
          placeholder={holder}
        />
      </View>
    );
  };

  return (
    <View style={styles.forFullScreen}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />
      <TouchableOpacity
        style={styles.forLastButton}
        onPress={() => {
          Alert.alert('작성하신 내용을 제출하시겠습니까?', '', [
            { style: 'cancel', text: '아니요' },
            {
              text: '네',
              onPress: () => {
                addQuestList();
                // navigation.navigate('Main');
              },
            },
          ]);
        }}>
        <Text style={styles.forLastText}> 제출하기</Text>
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
