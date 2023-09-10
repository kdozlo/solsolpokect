// 타입스크립트 적용해보기
export const getAccountList = async userName => {
  userName = 'WmokLBDC09/yfin==';
  const userAccountList = await fetch(
    'https://shbhack.shinhan.com/v1/account',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset = UTF-8',
        credentials: 'include',
      },
      body: JSON.stringify({
        dataHeader: {
          apikey: '2023_Shinhan_SSAFY_Hackathon',
        },
        dataBody: {
          실명번호: userName,
        },
      }),
    },
  );

  // 일반 계좌만 받아오도록 필터링
  if (userAccountList.ok) {
    let result = await userAccountList.json();
    result = result.dataBody['조회내역1'].filter(
      account => account['상품명'] == '저축예금',
    );

    return result;
  }

  return null;
};
