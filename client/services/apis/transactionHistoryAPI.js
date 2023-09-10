// 타입스크립트 적용해보기
export const getTransactionList = async accountNum => {
  accountNum = '110184999999';

  const transactionList = await fetch(
    'https://shbhack.shinhan.com/v1/search/transaction',
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
          계좌번호: accountNum,
        },
      }),
    },
  );

  // 일반 계좌만 받아오도록 필터링
  if (transactionList.ok) {
    let result = await transactionList.json();
    result = result.dataBody['거래내역'];
    return result;
  }

  return null;
};
