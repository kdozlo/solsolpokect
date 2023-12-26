import { atom } from 'recoil';

import { parentDummyUser } from '../test/dummyData/user';

export const loggedInUserAtom = atom({
  key: 'loggedInUserAtom',
  default: parentDummyUser,
});

export const selectedUserInfoAtom = atom({
  key: 'selectedUserInfoAtom',
  default: null,
});
