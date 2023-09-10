import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Dimensions } from 'react-native';

import Calender from './pages/Calender';
import Detail from './pages/Detail';
import Main from './pages/Main';
import QuestType1 from './pages/QuestType1';
import QuestType3 from './pages/QuestType2';
import QuestType2 from './pages/QuestType3';
import SignUp from './pages/SignUp';
import TransactionHistory from './pages/TransactionHistory';

const Stack = createNativeStackNavigator();
const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Calender"
          component={Calender}
          options={{
            title: '9월',
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
          name="QuestType-1"
          component={QuestType3}
          options={{
            title: '새 챌린지 만들기!',
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
          component={QuestType2}
          options={{
            title: '사진 인증?!',
            headerStyle: styles.forHeader,
            headerTitleStyle: styles.headerTitleStyle,
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
