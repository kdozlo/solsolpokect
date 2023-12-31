import { SOLSOL_URL } from '../../utils/const/api';

// 유저 정보 조회 api
export const getUserInfo = async userId => {
  const userInfoRes = await fetch(`http://${SOLSOL_URL}/api/users/info/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      credentials: 'include',
    },
  });

  // 일반 계좌만 받아오도록 필터링
  if (userInfoRes.ok) {
    console.log('유저 호출 성공');
    const result = await userInfoRes.json();
    return result.data;
  }
  console.log('유저 호출 실패');
  return null;
};
