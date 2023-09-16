import { atom } from 'recoil';

export const pocketMoneyModalAtom = atom({
  key: 'pocketMoneyModalAtom',
  default: false,
});

export const automaticPaymentItemAtom = atom({
  key: 'automaticPaymentItemAtom',
  default: null,
});

export const automaticPaymentListAtom = atom({
  key: 'automaticPaymentListAtom',
  default: [],
});

export const automaticCurrentMoneyAtom = atom({
  key: 'automaticCurrentMoneyAtom',
  default: 0,
});

export const automaticPaymentDateAtom = atom({
  key: 'automaticCurrentDateAtom',
  default: undefined,
});
