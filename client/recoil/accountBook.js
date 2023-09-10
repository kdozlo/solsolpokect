import dayjs from 'dayjs';
import { atom } from 'recoil';

export const accountUserAtom = atom({
  key: 'accountUser',
  default: '',
});

export const accountDateAtom = atom({
  key: 'accountDate',
  default: dayjs(),
});

export const isPickerVisibleAtom = atom({
  key: 'accountPickerModalBoolean',
  default: false,
});
