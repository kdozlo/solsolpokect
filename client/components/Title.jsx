import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HIGHT = Dimensions.get('window').height;

export default ({ navigation, title }) => {
  return (
    <TouchableOpacity
      style={styles.header}
      onPress={() => navigation.navigate('Calender')}>
      <View style={{}}>
        <Text style={styles.headerFont}>{title}</Text>
      </View>
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
