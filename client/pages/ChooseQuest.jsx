/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { images } from '../constants/index';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default ({ navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        flex: 3,
        backgroundColor: '#AAEBFF',
        justifyContent: 'space-around',
      }}>
      <View>
        <Image
          source={images.whiteBear}
          style={{ alignSelf: 'center', width: 100, height: 100 }}
        />
        <Text
          style={{
            alignSelf: 'center',
            color: '#ffffff',
            fontSize: 50,
            marginTop: 10,
            marginBottom: 20,
          }}>
          {' '}
          어떤 도전을 할까?!{' '}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <FontAwesome name="camera" size={100} color="#ffffff" />
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>
            인증 챌린지!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <MaterialIcons name="attach-money" size={100} color="#ffffff" />
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              color: '#ffffff',
            }}>
            {' '}
            머니 챌린지!
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
