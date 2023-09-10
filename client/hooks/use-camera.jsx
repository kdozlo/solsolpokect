/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

const ASYNC_KEY = {
  IMAGE: 'image',
};

export default () => {
  const cameraRef = useRef(); // 카메라 컴포넌트의 속성을 가져다 쓰기 위한 ref
  const [hasCameraPermission, setHasCameraPermission] = useState(null); // 카메라 접근 권한 여부
  const [image, setImage] = useState(null); // 카메라로 찍은 사진의 uri를 넣는 곳
  const [toggle, setToggle] = useState(Camera.Constants.Type.back); // 카메라가 현재 앞인지 뒤인지
  const [modalVisible, setModalVisible] = useState(false); // 카메라 모달 보이게 안 보이게
  const [photoAlready, setPhotoAlready] = useState(false); // 사진 찍었니 안 찍었니
  const [firstScreenVisible, setFirstScreenVisible] = useState(true); // 처음 로고 띄우는 modal 용

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync(); // 카메라 접근 동의 받기
      setHasCameraPermission(cameraPermission.status === 'granted'); // 동의하면 권한 상태변수 true로 바꿈.
      setImage(''); // 이미지 초기화
      const imageFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGE);
      // 데이터베이스로 부터 저번에 찍은 이미지 uri 가져오기
      if (imageFromStorage !== null) {
        // 이미지가 null 이 아니라면 parse해서 변수에 uri를 저장.
        const parsedImage = JSON.parse(imageFromStorage);
        // console.log(parsedImage);
        setImage(parsedImage); // 저장고에 있는 이미지를 가져와 쓴다.
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!cameraRef) return;
    const data = await cameraRef.current.takePictureAsync(null); // 참조를 통해 Camera 태그에 접근해서 해당 내장 함수 이용
    setImage(data.uri); // 찍은 사진의 uri를 setImage에 넣는다.
    const jsonData = JSON.stringify(data); // data 객체를 string 화 시켜서
    await AsyncStorage.setItem(ASYNC_KEY.IMAGE, jsonData); // 저장고 안에 넣기
    setModalVisible(false); // 사진 모달 닫기
    setPhotoAlready(true); // 사진 보여주기
  };

  const onPressToggle = () => {
    // Camera 화면 전환 토글
    setToggle(
      toggle === Camera.Constants.Type.front
        ? Camera.Constants.Type.back
        : Camera.Constants.Type.front,
    );
  };

  const onPressCamera = () => {
    // 메인 화면에 카메라 버튼 클릭하면 카메라 모달이 열려서 카메라 보이게 하기 -> 명세와 구현의 분리
    setModalVisible(true);
  };
  return {
    image,
    cameraRef,
    modalVisible,
    setModalVisible,
    toggle,
    setToggle,
    takePicture,
    photoAlready,
    firstScreenVisible,
    setFirstScreenVisible,
    onPressToggle,
    onPressCamera,
  };
};
