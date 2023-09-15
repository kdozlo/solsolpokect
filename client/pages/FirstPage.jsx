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
} from 'react-native';
import { images } from '../constants';
import { useRecoilState } from 'recoil';
import { userIdState, userPasswordState } from './SignUp';
import axios from 'axios';

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
  const [userId, setuserId] = useRecoilState(userIdState);
  const [userPassword, setUserPassword] = useRecoilState(userPasswordState);

  const LoginSet = {
    userId: userId,
    password: userPassword,
  };

  const submit = async () => {
    await axios
      .post('http://3.39.248.247:8080/api/users/login', {
        userId: LoginSet.userId,
        password: LoginSet.password,
      })
      .then(function (response) {
        navigation.navigate('Main');
        console.log(response);
      })
      .catch(function (error) {
        console.error(error.response);
      });
  };

  return (
    <ImageBackground source={icons[0]} style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={icons[1]} style={{ width: 200, height: 200, marginTop: 150 }} />
        <Image
          source={icons[2]}
          style={{ width: 200, height: 200, marginTop: 150, bottom: 190 }}
          resizeMode="contain"
        />
        <View style={{ flexDirection: 'row', bottom: 250 }}>
          <Image source={icons[6]} style={{ width: 100, height: 100 }} />
          <TextInput style={[styles.input, { left: 30 }]} value={userId} onChangeText={setuserId} />
        </View>

        <View style={{ flexDirection: 'row', bottom: 280 }}>
          <Image source={icons[7]} style={{ width: 150, height: 100 }} />
          <TextInput style={[styles.input, { top: 20 }]} value={userPassword} onChangeText={setUserPassword} />
        </View>

        <View style={{ flexDirection: 'row', bottom: 300, justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => {
              submit();
            }}>
            <Image source={icons[5]} style={{ width: 200, height: 200 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Image source={icons[4]} style={{ width: 200, height: 200 }} />
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
    width: 300,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#ffffff',
  },
});
