/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, SafeAreaView } from 'react-native';
import { images } from '../constants';
const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;

const icons = {
  0: images.background,
};

export default ({ navigation, title }) => {
  return (
    <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Calender')}>
      <SafeAreaView>
        <Text style={styles.headerFont}>{title}</Text>
      </SafeAreaView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  header: {
    width: WIDTH,
    height: HIGHT / 10,
    justifyContent: 'center',
    backgroundColor: '#3D70FF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  headerFont: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
