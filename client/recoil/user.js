import { atom } from 'recoil';

import { parentDummyUser } from '../test/dummyData/user';

export const loggedInUserAtom = atom({
  key: 'loggedInUserAtom',
  default: parentDummyUser,
});
