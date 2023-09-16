/* eslint-disable prettier/prettier */
import {
  ImageBackground,
  View,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { images } from '../constants';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import axios from 'axios';
import UserInfo, {
  DB_KEYState,
  QuestListState,
  userAccountState,
  userCreditScoreState,
  userFamilyIdState,
  userRoleState,
  usernameState,
  URL,
} from '../recoil/UserInfo';

const icons = {
  0: images.background,
  1: images.mascot,
  2: images.TitleLogo,
  3: images.EmptyCloud,
  4: images.Regist,
  5: images.Login,
  6: images.Id,
  7: images.Password,
};

export default ({ navigation }) => {
  const { userId, setuserId, userPassword, setUserPassword } = UserInfo();

  const setUsername = useSetRecoilState(usernameState);
  const setUserRole = useSetRecoilState(userRoleState);
  const setUserFamilyId = useSetRecoilState(userFamilyIdState);
  const setCreditScore = useSetRecoilState(userCreditScoreState);
  const setAccount = useSetRecoilState(userAccountState);
  const setQuestList = useSetRecoilState(QuestListState);
  const QuestList = useRecoilValue(QuestListState);
  const setDB_KEYState = useSetRecoilState(DB_KEYState);

  const LoginSet = {
    userId: userId,
    password: userPassword,
  };

  const submit = async () => {
    let DB_KEY;
    await axios
      .post(`http://${URL}/api/users/login`, {
        userId: LoginSet.userId,
        password: LoginSet.password,
      })
      .then(function (response) {
        // console.log(response.data);
        const a = response.data.data;
        console.log(a);
        setUsername(a.username);
        setUserRole(a.role);
        setAccount(a.account);
        setCreditScore(a.creditScore);
        setUserFamilyId(a.familyId);
        setuserId(a.userId);
        DB_KEY = response.data.data.id;
        setDB_KEYState(DB_KEY);
        console.log(DB_KEY);
      })
      .catch(function (error) {
        const msg = error.response.data.error.msg;
        Alert.alert(msg, '', [
          {
            text: '돌아가기',
            style: 'cancel',
          },
        ]);
        setUserPassword('');
      });

    //QuestList 서버에서 받아오기
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
        console.log(parsedList);
        navigation.navigate('Main');
      })
      .catch(function (error) {
        const msg = error.response;
        console.error(msg);
      });
  };

  return (
    <ImageBackground source={icons[0]} style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', bottom: 50 }}>
        <Image source={icons[1]} style={{ width: 200, height: 200, marginTop: 150 }} />
        <Image
          source={icons[2]}
          style={{ width: 250, height: 250, marginTop: 150, bottom: 190 }}
          resizeMode="contain"
        />
        <View style={{ flexDirection: 'row', bottom: 250 }}>
          <Image source={icons[6]} style={{ width: 100, height: 100 }} />
          <TextInput style={[styles.input, { left: 30 }]} value={userId} onChangeText={setuserId} />
        </View>

        <View style={{ flexDirection: 'row', bottom: 280 }}>
          <Image source={icons[7]} style={{ width: 150, height: 100 }} />
          <TextInput style={[styles.input, { top: 30 }]} value={userPassword} onChangeText={setUserPassword} />
        </View>

        <View style={{ flexDirection: 'row', bottom: 300, justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => {
              submit();
            }}>
            <Image source={icons[5]} style={{ width: 150, height: 150 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Image source={icons[4]} style={{ width: 150, height: 150 }} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    top: 35,
    left: 5,
    height: 35,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});
