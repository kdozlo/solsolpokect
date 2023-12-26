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
  TouchableHighlight,
} from 'react-native';

import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { useQuestList } from '../hooks/use-questList';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { nameListState, URL, DB_KEYState, QuestListState } from '../recoil/UserInfo';
/* eslint-disable prettier/prettier */

export default ({ navigation, route }) => {
  const { category } = route.params;

  const { DATA, getGoalDate, questList, storeAndsetQuestList } = useQuestList();

  const WeAreFamily = useRecoilValue(nameListState);
  const [userDB_key, setUserDB_key] = useState(0);
  const [missionName, setMissionName] = useState('');
  const [reward, setReward] = useState('');
  const [appeal, setAppeal] = useState('');
  const QuestLists = useRecoilValue(QuestListState);
  const setQuestList = useSetRecoilState(QuestListState);
  const DB_KEY = useRecoilValue(DB_KEYState);

  const addQuestList = async () => {
    const lastId = questList.length === 0 ? 0 : questList[questList.length - 1].id;

    const newQuest = {
      id: lastId + 1,
      category,
      date: getGoalDate(),
      userDB_key,
      missionName,
      reward,
      appeal,
    };

    console.log('퀘스트 리스트입니다.');
    console.log(newQuest);

    console.log(newQuest.userDB_key);
    console.log(DB_KEY);

    const answer = 'dddd';

    await axios
      .post(`http://${URL}/api/mission/create/${DB_KEY}`, {
        userId: newQuest.userDB_key,
        missionName: newQuest.missionName,
        reward: newQuest.reward,
        goal: answer,
        category: newQuest.category,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log('퀘스트 생성 내용 전송 에러 입니다.');
        console.error(error.response);
      });

    await axios
      .get(`http://${URL}/api/mission/list?userId=${DB_KEY}`)
      .then(function (response) {
        const QList = response.request._response;
        const parsedList = JSON.parse(QList);
        const defaultList = {
          id: -1,
          type: 3,
        };

        setQuestList([defaultList, ...parsedList.data]);
        console.log(...QuestLists);
        navigation.navigate('Main');
      })
      .catch(function (error) {
        const msg = error.response;
        console.error(msg);
      });
  };

  const familyRenderItem = ({ item }) => {
    if (item[0] === userDB_key) {
      return (
        <TouchableOpacity
          key={item[0]}
          onPress={() => {
            setUserDB_key(item[0]);
          }}>
          <View
            style={{
              flexDirection: 'row',
              opacity: 1,
            }}>
            <Text style={{ margin: 20 }}>{item[0]}</Text>
            <Text style={{ margin: 20 }}>{item[1]}</Text>
            <Text style={{ margin: 20 }}>{item[2]}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={item[0]}
          onPress={() => {
            setUserDB_key(item[0]);
          }}>
          <View
            style={{
              flexDirection: 'row',
              opacity: 0.3,
            }}>
            <Text style={{ margin: 20 }}>{item[0]}</Text>
            <Text style={{ margin: 20 }}>{item[1]}</Text>
            <Text style={{ margin: 20 }}>{item[2]}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({ item: { id, type, holder, title } }) => {
    if (id === 4) {
      return (
        <View style={[styles.forView]}>
          <Text style={styles.forText}>{title}</Text>
          <FlatList data={WeAreFamily} renderItem={familyRenderItem} />
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
            value={setAppeal}
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
          onChangeText={id === 2 ? setMissionName : setReward}
          value={id === 2 ? setMissionName : setReward}
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
                navigation.navigate('Main');
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
