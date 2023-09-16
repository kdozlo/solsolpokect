import { atom } from 'recoil';

export const transferSelectedBankAtom = atom({
  key: 'transferSelectedBankAtom',
  default: 0,
});

export const transferAccountNumberAtom = atom({
  key: 'transferAccountNumberAtom',
  default: null,
});

export const transferMoneyAtom = atom({
  key: 'transferMoneyAtom',
  default: 0,
});

export const transferBankInfoModalAtom = atom({
  key: 'transferBankInfoModalAtom',
  default: false,
});

export const transferPWModalAtom = atom({
  key: 'transferPWModalAtom',
  default: false,
});
