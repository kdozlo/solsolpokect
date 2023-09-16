import { SOLSOL_URL } from '../../utils/const/api';

export const getDailyFeedbackData = async (userId, date) => {
  const dailyRes = await fetch(`http://${SOLSOL_URL}/api/diary/score/?id=${userId}&date`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      credentials: 'include',
    },
  });

  // 일반 계좌만 받아오도록 필터링
  if (dailyRes.ok) {
    console.log('데일리 피드백 성공');
    const result = await dailyRes.json();
    return result.data;
  }
  console.log('데일리 피드백 실패');
  return null;
};

// 유저 정보 조회 api
export const getWeeklyFeedbackData = async (userId, year, month) => {
  const weeklyRes = await fetch(`http://${SOLSOL_URL}/api/users/infos?user-id=${userId}&year=${year}&month=${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset = UTF-8',
      credentials: 'include',
    },
  });

  // 일반 계좌만 받아오도록 필터링
  if (weeklyRes.ok) {
    console.log('위클리 피드백 성공');
    const result = await weeklyRes.json();
    return result.data;
  }
  console.log('위클리 피드백 실패');
  return null;
};
