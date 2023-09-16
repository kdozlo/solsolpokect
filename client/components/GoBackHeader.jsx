import { Image, Text, TouchableOpacity, View, Pressable, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const GoBackHeader = ({ title, navigation, children }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.imgButton}>
        <Image source={icons.back} resizeMode="contain" style={styles.goBackImg} />
      </Pressable>
      <View>{children}</View>
      <Text style={styles.goBackText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'col',
    marginTop: SIZES.padding * 6,
    marginBottom: SIZES.padding * 2,
  },
  imgButton: {
    marginBottom: SIZES.padding,
  },
  goBackImg: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  goBackText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 700,
  },
});

export default withNavigation(GoBackHeader);
