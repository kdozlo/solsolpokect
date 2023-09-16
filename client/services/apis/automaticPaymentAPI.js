import { SOLSOL_URL } from '../../utils/const/api';

// 자동 조회 생성 api
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

  return null;
};

// 자동 이체 생성 api
export const addAutomaticPaymentList = async (autoDate, money, userId, childAccount) => {
  console.log('add params', autoDate, money, userId, childAccount);
  const addPaymentListRes = await fetch(`http://${SOLSOL_URL}/api/auto-transfer/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      // credentials: 'include',
    },

    body: JSON.stringify({
      autoDate: '',
      money,
      userId,
      childAccount,
    }),
  });

  // 생성 성공
  if (addPaymentListRes.ok) {
    console.log('생성 성공');
    const result = await addPaymentListRes.json();
    return result.data;
  } else {
    console.log('생성 실패');
  }

  return null;
};

// 자동 이체 수정 api
export const updateAutomaticPaymentList = async (transferId, autoDate, money) => {
  const updateRes = await fetch(`http://${SOLSOL_URL}/api/auto-transfer/${transferId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
    },

    body: JSON.stringify({
      autoDate: '',
      money,
    }),
  });

  // 생성 성공
  if (updateRes.ok) {
    console.log('수정 성공');
    const result = await updateRes.json();
    return result.msg;
  } else {
    console.log('수정 실패');
  }

  return null;
};

// 자동 이체 삭제 api
export const deleteAutomaticPaymentList = async transferId => {
  const deleteRes = await fetch(`http://${SOLSOL_URL}/api/auto-transfer/${transferId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
    },
  });

  // 삭제 성공
  if (deleteRes.ok) {
    console.log('삭제 성공');
    const result = await deleteRes.json();
    return result.msg;
  } else {
    console.log('삭제 실패');
  }

  return null;
};
