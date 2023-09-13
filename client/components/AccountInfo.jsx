import { Image, Text, View } from 'react-native';

const AccountInfo = ({ bankLogo, bankName, accountNum }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={bankLogo}
        style={{
          width: 20,
          height: 20,
        }}
      />
      <Text style={{ marginLeft: 5 }}>{bankName}</Text>
      <Text style={{ marginLeft: 5 }}>{accountNum}</Text>
    </View>
  );
};

export default AccountInfo;
