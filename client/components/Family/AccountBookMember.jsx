import { Image, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';

import { images } from '../../constants';
import { accountUserAtom } from '../../recoil/accountBook';

const AccountBookMember = ({ user }) => {
  const [selectedUserId, setSelectedUserId] = useRecoilState(accountUserAtom);

  return (
    <TouchableWithoutFeedback
      disabled={false}
      key={user.userId}
      onPress={() => {
        setSelectedUserId(prev => {
          return user.id;
        });
      }}>
      <View style={{ transform: [{ scale: user.id === selectedUserId ? 1.5 : 1 }] }}>
        <Image source={images.father} />
        <Text>{user.username}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AccountBookMember;
