import React, { useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ScoreDropdown = ({ dailyScore }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dailyScore + '');
  const [items, setItems] = useState([
    { label: '1점', value: '1' },
    { label: '2점', value: '2' },
    { label: '3점', value: '3' },
    { label: '4점', value: '4' },
    { label: '5점', value: '5' },
  ]);

  return (
    <View>
      <DropDownPicker
        style={{ borderWidth: 0 }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
      />
    </View>
  );
};

export default ScoreDropdown;
