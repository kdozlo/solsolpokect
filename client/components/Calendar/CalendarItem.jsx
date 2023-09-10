import dayjs from 'dayjs';
import { Text, TouchableOpacity } from 'react-native';

import { COLUMN_SIZE } from '../../utils/const/CalendarConstant';

const CalendarItem = ({
  text,
  color,
  opacity,
  disabled,
  onPress,
  isSelected,
  hasTodo,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        width: COLUMN_SIZE,
        height: COLUMN_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isSelected ? '#c2c2c2' : 'transparent',
        borderRadius: COLUMN_SIZE / 2,
      }}>
      <Text
        style={{ color, opacity, fontWeight: isSelected ? 'bold' : 'normal' }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CalendarItem;
