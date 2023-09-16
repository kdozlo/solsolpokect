import dayjs from 'dayjs';
import { atom } from 'recoil';

import { childDummyUser, parentDummyUser } from '../test/dummyData/user';

// Users Info..
export const accountUserAtom = atom({
  key: 'accountUser',
  default: childDummyUser.id,
});
export const familyMemberApiResAtom = atom({
  key: 'familyMemberApiResAtom',
  default: [],
});
export const familyMemberListAtom = atom({
  key: 'familyMemberListAtom',
  default: [],
});

// Calendar Info...
export const accountDateAtom = atom({
  key: 'accountDate',
  default: dayjs(),
});

export const isPickerVisibleAtom = atom({
  key: 'accountPickerModalBoolean',
  default: false,
});

export const dailyFeedbackDataAtom = atom({
  key: 'dailyFeedbackDataAtom',
  default: [],
});

export const weeklyFeedbackDataAtom = atom({
  key: 'weeklyFeedbackDataAtom',
  default: [],
});

export const isFeedbackVisibleAtom = atom({
  key: 'accountFeedbackModalBoolean',
  default: false,
});

export const ScrollHeightAtom = atom({
  key: 'ScrollHeightAtom',
  default: 0,
});
