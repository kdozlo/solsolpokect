import { atom } from 'recoil';

export const authPinCountAtom = atom({
  key: 'authPinCountAtom',
  default: 0,
});

export const authPWValueAtom = atom({
  key: 'authPWValueAtom',
  default: '',
});

export const authPWModalAtom = atom({
  key: 'authPWModalAtom',
  default: false,
});
