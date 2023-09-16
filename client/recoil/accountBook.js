import dayjs from 'dayjs';
import { atom } from 'recoil';

import { childDummyUser, parentDummyUser } from '../test/dummyData/user';

// Users Info..
export const accountUserAtom = atom({
  key: 'accountUser',
  default: childDummyUser.id,
});
export const familyMemberIdListAtom = atom({
  key: 'familyMemberIdListAtom',
  default: [],
});

export const familyMemberListAtom = atom({
  key: 'familyMemberListAtom',
  default: [],
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
