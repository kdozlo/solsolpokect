import { atom } from 'recoil';

export const pocketMoneyModalAtom = atom({
  key: 'pocketMoneyModalAtom',
  default: false,
});

export const automaticPaymentItemAtom = atom({
  key: 'automaticPaymentItemAtom',
  default: null,
});