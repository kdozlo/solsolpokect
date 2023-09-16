import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, View, FlatList, StyleSheet } from 'react-native';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import TransactionHistory from './TransactionHistory';
import AccountBookUserInfo from '../components/AccountBookUserInfo';
import Calendar from '../components/Calendar/Calendar';
import FamilyList from '../components/Family/FamilyList';
import GoBackHeader from '../components/GoBackHeader';
import { useCalendar } from '../hooks/use-calendar';
import { accountDateAtom, familyMemberApiResAtom, weeklyFeedbackDataAtom } from '../recoil/accountBook';
import { loggedInUserAtom } from '../recoil/user';
import { getFamilyMemberIdList } from '../services/apis/familyAPI';

const AccountBook = ({ navigation }) => {
  const [familyApiRes, setFamilyApiRes] = useRecoilState(familyMemberApiResAtom);
  // const [weeklyFeedback, setWeeklyFeedback] = useRecoilState(weeklyFeedbackDataAtom);
  const { isDatePickerVisible, handleConfirm, hideDatePicker } = useCalendar();
  const selectedDate = useRecoilValue(accountDateAtom);
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const flatListRef = useRef();

  console.log(selectedDate.get('year'));

  // 가족 id 정보 받아오기
  useEffect(() => {
    const getFamilyMemberList = async () => {
      const result = await getFamilyMemberIdList(loggedInUser.id);
      setFamilyApiRes(result);
    };
    getFamilyMemberList();
  }, []);

  return (
    <FlatList
      style={styles.container}
      ref={flatListRef}
      ListHeaderComponent={() => {
        return (
          <>
            <GoBackHeader title={`${familyApiRes.familyName} 가계부`} navigation={navigation} />
            <SafeAreaView style={styles.contents}>
              <FamilyList pageInfo={'AccountBook'} memberApiRes={familyApiRes} />
              {/* 캘린더 */}
              <Calendar />
              {/* 유저 이달의 소비 현황 및 피드백*/}
              <AccountBookUserInfo flatListRef={flatListRef} />
              {/* 거래 내역들 */}
              <TransactionHistory />
            </SafeAreaView>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </>
        );
      }}></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  contents: {
    alignItems: 'center',
    flexDirection: 'col',
  },
});

export default AccountBook;
