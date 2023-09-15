import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { images } from '../../constants';
import { accountUserAtom } from '../../recoil/accountBook';
import { transferAccountNumberAtom, transferSelectedBankAtom } from '../../recoil/transfer';

// 용돈 관리 화면에서 사용되는 컴포넌트
// - 용돈 관리 화면에서 해당 컴포넌트를 클릭하면 해당 정보를 가지고 금액 선택 화면으로 넘어간다.
// - 이 작업 해줄려면 각 이체 관련 컴포넌트에서 화면 나올 때 관련된 state를 초기화시켜줘야 한다.
//   -> useState로 초기화면 때 재설정해주거나, 나갈 때 reset하는 방식 중 적절한 것 사용하기
const PocketMoneyMember = ({ user }) => {
  const [selectedUser, setSelectedUser] = useRecoilState(accountUserAtom);
  const [accountNum, setAccountNum] = useRecoilState(transferAccountNumberAtom);
  const [bankIndex, setBankIndex] = useRecoilState(transferSelectedBankAtom);

  console.log(user);
  return (
    <TouchableWithoutFeedback
      disabled={false}
      key={user.userId}
      onPress={() => {
        setSelectedUser(pre => {
          return user.userId;
        });
        setBankIndex(pre => 0);
        setAccountNum(pre => user.account);
        console.log(selectedUser, accountNum, bankIndex);
      }}>
      <View style={{ transform: [{ scale: user.userId === selectedUser ? 1.5 : 1 }] }}>
        <Image source={images.father} />
        <Text style={{ color: 'black' }}>{user.name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PocketMoneyMember;
