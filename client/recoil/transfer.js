import { atom } from 'recoil';

export const transferSelectedBankAtom = atom({
  key: 'transferSelectedBankAtom',
  default: 0,
});

export const transferAccountNumberAtom = atom({
  key: 'transferAccountNumberAtom',
  default: null,
});

export const transferBankInfoModalAtom = atom({
  key: 'transferBankInfoModalAtom',
  default: false,
});
