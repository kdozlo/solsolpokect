/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';
import { getAccountList } from '../services/apis/accountListAPI';
import axios from 'axios';

const ICONS = {
  0: images.background,
};

export const SignUp = ({ navigation }) => {
  // global States(can use in Project anywhere)

  // use in Page States(using in SignUP.jsx)
  const [showPassword, setShowPassword] = React.useState(false); // 비밀번호 보여주기 여부
  const [accountList, setAccountList] = React.useState([]); // 전화번호 나라 내역 리스트
  const [selectedAccount, setSelectedAccount] = React.useState(null); // 선택된 전화번호 나라
  const [modalVisible, setModalVisible] = React.useState(false);

  const [selectedRole, setSelectedRole] = useState(null); // 선택된 역할
  const [roleModalVisible, setRoleModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const userInfo = {
    role: selectedRole,
    username: username,
    account: selectedAccount?.['계좌번호'],
    userId: userID,
    password: userPassword,
  };

  const submit = async () => {
    await axios
      .post('http://3.34.50.120:8080/api/users/signup', {
        role: userInfo.role,
        username: userInfo.username,
        account: userInfo.account,
        userId: userInfo.userId,
        password: userInfo.password,
      })
      .then(function (response) {
        console.log(response.data.data);
        navigation.navigate('FirstPage');
      })
      .catch(function (error) {
        console.log(userInfo.userId);
        const msg = error.response.data.error.msg;
        Alert.alert(msg, '', [
          {
            text: '돌아가기',
            style: 'cancel',
          },
        ]);
      });
  };

  // Get AccountList
  useEffect(() => {
    // 마은에 안드는 코드.. 고치자!
    getAccountList().then(res => setAccountList(res));
    console.log(selectedAccount?.['계좌번호']);
  }, []);

  const RoleList = [
    { id: 1, role: 'parent', name: '부모' },
    {
      id: 2,
      role: 'Child',
      name: '자녀',
    },
  ];

  // UI Components
  // 1. 뒤로가기 버튼 컴포넌트
  // 2. Form 컴포넌트
  // 3. 회원 가입 버튼

  // 뒤로가기 버튼 컴포넌트
  function renderHeader({ title }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: 'black',
          }}
        />

        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: 'black',
            ...FONTS.h4,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  // Form 컴포넌트
  function renderForm() {
    return (
      // Form 컴포넌트
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {/* 이름 작성 */}
        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}>
          <Text
            style={{
              color: 'black',
              ...FONTS.body3,
            }}>
            이름
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              height: 40,
              color: 'black',
              ...FONTS.body3,
            }}
            placeholder="이름을 입력해주세요."
            placeholderTextColor={'black'}
            selectionColor={'black'} // 텍스트 입력의 강조 표시 및 커서 색상입니다.
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View
          style={{
            marginTop: SIZES.padding * 3,
          }}>
          <Text
            style={{
              color: 'black',
              ...FONTS.body3,
            }}>
            계정 아이디
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              height: 40,
              color: 'black',
              ...FONTS.body3,
            }}
            placeholder="아이디를 입력해주세요."
            placeholderTextColor={'black'}
            selectionColor={'black'} // 텍스트 입력의 강조 표시 및 커서 색상입니다.
            value={userID}
            onChangeText={setUserID}
          />
        </View>

        {/* 계좌 번호 */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: 'black', ...FONTS.body3 }}>계좌 번호</Text>

          <View style={{ flexDirection: 'row' }}>
            {/* 모달 띄우는 버튼 컴포넌트 */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body2,
              }}
              onPress={() => setModalVisible(true)}>
              {/* 드롭 다운 아래 화살표(기호에 따라 표시) */}
              <View style={{ justifyContent: 'center' }}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: 'black',
                  }}
                />
              </View>

              {/* 신한 은행 로고 넣어줄 예정 */}
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Image
                  source={images.usFlag} // 이 부분을 신한은행 로고로 변경
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              {/* 신한 은행 계좌번호로 대체 예정*/}
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ color: 'black', ...FONTS.body3 }}>{selectedAccount?.['계좌번호']}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 비밀 번호 */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: 'black', ...FONTS.body3 }}>Password</Text>

          {/* 비밀번호 입력 컴포넌트 */}
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              height: 40,
              color: 'black',
              ...FONTS.body3,
            }}
            placeholder="설정할 비밀번호를 입력해주세요."
            placeholderTextColor={'black'}
            selectionColor={'black'}
            secureTextEntry={!showPassword}
            value={userPassword}
            onChangeText={setUserPassword}
          />

          {/* 비밀번호 표시 버튼 */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{
                height: 20,
                width: 20,
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* 역할 고르기 */}
        <View style={{ marginTop: SIZES.padding * 2 }}>
          <Text style={{ color: 'black', ...FONTS.body3 }}>가족 구성원 중 누구이신가요? </Text>

          <View style={{ flexDirection: 'row' }}>
            {/* 모달 띄우는 버튼 컴포넌트 */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body2,
              }}
              onPress={() => setRoleModalVisible(true)}>
              {/* 드롭 다운 아래 화살표(기호에 따라 표시) */}
              <View style={{ justifyContent: 'center' }}>
                <Image
                  source={icons.down}
                  style={{
                    width: 10,
                    height: 10,
                    tintColor: 'black',
                  }}
                />
              </View>

              {/* 신한 은행 로고 넣어줄 예정 */}
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Image
                  source={images.usFlag} // 이 부분을 신한은행 로고로 변경
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              {/* 신한 은행 계좌번호로 대체 예정*/}
              <View style={{ justifyContent: 'center', marginLeft: 5 }}>
                <Text style={{ color: 'black', ...FONTS.body3 }}>{selectedRole}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* 역할 고르기 끝  */}
      </View>
    );
  }

  // 회원 가입 버튼 컴포넌트
  function renderButton() {
    return (
      <View style={{ margin: SIZES.padding * 3 }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            // console.log(userInfo);
            submit();
          }}>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>회원 가입!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 모달 창 컴포넌트
  // - 여러 개의 계좌 정보를 리스트 형태로 표현해준다.
  function renderAccountListModal() {
    // 계좌 1개의 정보를 담는 컴포넌트
    const accountItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: 'row' }}
          onPress={() => {
            setSelectedAccount(item);
            setModalVisible(false);
          }}>
          <Text style={{ color: COLORS.black, ...FONTS.body4 }}>{item['계좌번호']}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {/* 리스트 선택 화면 */}
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
              }}>
              <FlatList
                data={accountList}
                renderItem={accountItem}
                keyExtractor={(account, index) => `계좌-${index++}`}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  function renderRoleListModal() {
    // 계좌 1개의 정보를 담는 컴포넌트
    const RoleItem = ({ item: { id, role, name } }) => {
      return (
        <TouchableOpacity
          style={{ padding: SIZES.padding, flexDirection: 'row' }}
          onPress={() => {
            setSelectedRole(name);
            setRoleModalVisible(false);
          }}>
          <Text style={{ color: COLORS.black, ...FONTS.body4 }}>{name}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={roleModalVisible}>
        {/* 리스트 선택 화면 */}
        <TouchableWithoutFeedback onPress={() => setRoleModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.8,
                backgroundColor: COLORS.white,
                borderRadius: SIZES.radius,
              }}>
              <FlatList
                data={RoleList}
                renderItem={RoleItem}
                keyExtractor={id => `계좌-${id}`}
                showsVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <ImageBackground source={ICONS[0]} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} style={{ flex: 1 }}>
        {/* <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}> */}
        <ScrollView>
          {renderHeader({ title: 'SignUp' })}
          {/* { renderLogo()} */}
          {renderForm()}
          {renderButton()}
        </ScrollView>
        {renderAccountListModal()}
        {renderRoleListModal()}
        {/* </LinearGradient> */}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUp;

// 로고 컴포넌트 : 해당 컴포넌트를 활용하여 스플레시 화면으로 대체해볼 것
// function renderLogo() {
//   return (
//     <View
//       style={{
//         marginTop: SIZES.padding * 5,
//         height: 100,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <Image
//         source={images.wallieLogo}
//         resizeMode="contain"
//         style={{
//           width: '60%',
//         }}
//       />
//     </View>
//   );
// }
