import { atom } from 'recoil';

export const historyTransactionType = atom({
  key: 'historyTransactionTypeAtom',
  default: '입출금',
});
