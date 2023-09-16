import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRecoilState } from 'recoil';

import { automaticPaymentDateAtom } from '../../recoil/pocketMoney';

const DateDropdown = ({ autoDate }) => {
  const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(autoDate + '');
  const [date, setDate] = useRecoilState(automaticPaymentDateAtom);
  setDate(autoDate + '');

  const items = [
    { label: '1일', value: '1' },
    { label: '2일', value: '2' },
    { label: '3일', value: '3' },
    { label: '4일', value: '4' },
    { label: '5일', value: '5' },
    { label: '6일', value: '6' },
    { label: '7일', value: '7' },
    { label: '8일', value: '8' },
    { label: '9일', value: '9' },
    { label: '10일', value: '10' },
    { label: '11일', value: '11' },
    { label: '12일', value: '12' },
    { label: '13일', value: '13' },
    { label: '14일', value: '14' },
    { label: '15일', value: '15' },
    { label: '16일', value: '16' },
    { label: '17일', value: '17' },
    { label: '18일', value: '18' },
    { label: '19일', value: '19' },
    { label: '20일', value: '20' },
    { label: '21일', value: '21' },
    { label: '22일', value: '22' },
    { label: '23일', value: '23' },
    { label: '24일', value: '24' },
    { label: '25일', value: '25' },
    { label: '26일', value: '26' },
    { label: '27일', value: '27' },
    { label: '28일', value: '28' },
    { label: '29일', value: '29' },
    { label: '30일', value: '30' },
    { label: '말일', value: '말일' },
  ];

  return (
    <View
      style={{
        // flex: 1,
        width: '30%',
      }}>
      <DropDownPicker
        style={{ borderWidth: 0 }}
        open={open}
        value={date}
        items={items}
        setOpen={setOpen}
        setValue={setDate}
      />
    </View>
  );
};

export default DateDropdown;
