import dayjs from 'dayjs';
import { atom } from 'recoil';

import { dummyUser } from '../test/dummyData/user';

export const accountUserAtom = atom({
  key: 'accountUser',
  default: dummyUser.userId,
});

export const accountDateAtom = atom({
  key: 'accountDate',
  default: dayjs(),
});

export const isPickerVisibleAtom = atom({
  key: 'accountPickerModalBoolean',
  default: false,
});

export const isFeedbackVisibleAtom = atom({
  key: 'accountFeedbackModalBoolean',
  default: false,
});

export const ScrollHeightAtom = atom({
  key: 'accountScrollHeight',
  default: 0,
});
