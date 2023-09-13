import { Image, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { withNavigation } from 'react-navigation';

import { COLORS, SIZES, FONTS, icons, images } from '../constants';

const GoBackHeader = ({ title, navigation, children }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'col',
        marginTop: SIZES.padding * 6,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: 'black',
          }}
        />
      </Pressable>
      <View>{children}</View>
      <Text
        style={{
          color: 'black',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default withNavigation(GoBackHeader);
