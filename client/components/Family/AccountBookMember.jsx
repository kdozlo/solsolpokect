import { Image, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useRecoilState } from 'recoil';

import { images } from '../../constants';
import { accountUserAtom } from '../../recoil/accountBook';

const AccountBookMember = ({ user }) => {
  const [selectedUser, setSelectedUser] = useRecoilState(accountUserAtom);

  return (
    <TouchableWithoutFeedback
      disabled={false}
      key={user.userId}
      onPress={() => {
        console.log(selectedUser);
        setSelectedUser(prev => {
          return user.userId;
        });
      }}>
      <View style={{ transform: [{ scale: user.userId === selectedUser ? 1.5 : 1 }] }}>
        <Image source={images.father} />
        <Text>{user.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AccountBookMember;
