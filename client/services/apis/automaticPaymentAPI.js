import { SOLSOL_URL } from '../../utils/const/api';

export const getAutomaticPaymentList = async userId => {
  const paymentListRes = await fetch(`http://${SOLSOL_URL}/api/auto-transfer/list/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      credentials: 'include',
    },
  });

  // 일반 계좌만 받아오도록 필터링
  if (paymentListRes.ok) {
    const result = await paymentListRes.json();
    return result.data;
  }

  // return null;
};

export const addAutomaticPaymentList = () => {};
export const updateAutomaticPaymentList = () => {};
export const deleteAutomaticPaymentList = () => {};
