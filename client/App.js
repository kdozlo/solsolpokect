/* eslint-disable prettier/prettier */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Dimensions } from 'react-native';
import { RecoilRoot } from 'recoil';

import AccountBook from './pages/AccountBook';
import Calender from './pages/Calender';
import CheckTransferInfo from './pages/CheckTransferInfo';
import ChooseQuest from './pages/ChooseQuest';
import Detail from './pages/Detail';
import FirstPage from './pages/FirstPage';
import Main from './pages/Main';
import MakingQuest from './pages/MakingQuest';
import ManagingPocketMoney from './pages/ManagingPocketMoney';
import QuestType1 from './pages/QuestType1';
import QuestType3 from './pages/QuestType2';
import QuestType2 from './pages/QuestType3';
import SelectAccount from './pages/SelectAccount';
import SelectMoney from './pages/SelectMoney';
import SignUp from './pages/SignUp';
import TransactionHistory from './pages/TransactionHistory';
import TransferSuccess from './pages/TransferSuccess';

const Stack = createNativeStackNavigator();
const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstPage">
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />

          <Stack.Screen name="FirstPage" component={FirstPage} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />

          <Stack.Screen name="AccountBook" component={AccountBook} options={{ headerShown: false }} />
          <Stack.Screen name="SelectAccount" component={SelectAccount} options={{ headerShown: false }} />
          <Stack.Screen name="SelectMoney" component={SelectMoney} options={{ headerShown: false }} />
          <Stack.Screen name="CheckTransferInfo" component={CheckTransferInfo} options={{ headerShown: false }} />
          <Stack.Screen name="TransferSuccess" component={TransferSuccess} options={{ headerShown: false }} />
          <Stack.Screen name="ManagingPocketMoney" component={ManagingPocketMoney} options={{ headerShown: false }} />

          <Stack.Screen
            name="Calender"
            component={Calender}
            options={{
              title: '가계부',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              title: '상세',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name="QuestType1"
            component={QuestType1}
            options={{
              title: '돈 모으기 챌린지',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name="QuestType2"
            component={QuestType3}
            options={{
              title: '사진 인증?!',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen
            name="QuestType3"
            component={QuestType2}
            options={{
              title: '새 챌린지 만들기!',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />
          <Stack.Screen
            name="ChooseQuest"
            component={ChooseQuest}
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="MakingQuest"
            component={MakingQuest}
            options={{
              title: 'Quest를 만들어보자!',
              headerStyle: styles.forHeader,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: 'white',
            }}
          />

          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  forHeader: {
    width: WIDTH,
    height: HIGHT / 10,
    justifyContent: 'center',
    backgroundColor: '#3D70FF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTitleStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
