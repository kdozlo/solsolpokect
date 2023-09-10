/* eslint-disable prettier/prettier */
import { Camera } from 'expo-camera';
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Ionicons } from '@expo/vector-icons';

const StatusBarHeight = getStatusBarHeight(true);
const { width, height } = Dimensions.get('screen');

export default ({
  modalVisible,
  setModalVisible,
  onPressToggle,
  type,
  cameraRef,
  takePicture,
}) => {
  return (
    <Modal visible={modalVisible}>
      <Pressable
        onPress={() => setModalVisible(false)}
        style={{ flex: 1, backgroundColor: '#AAEBFF' }}>
        <Camera
          ref={cameraRef}
          type={type}
          style={{
            alignSelf: 'center',
            marginTop: StatusBarHeight,
            width: width - 50,
            height: height / 2,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        />
        <TouchableOpacity
          onPress={onPressToggle}
          style={{ alignSelf: 'center' }}>
          <Ionicons name="camera-reverse-outline" size={100} color="#3D70FF" />
        </TouchableOpacity>
        <Button title="사진 찍기" onPress={takePicture} />
      </Pressable>
    </Modal>
  );
};
