import { Text } from 'react-native';
import { styled } from 'styled-components';

// 거래 내역 1 항목에 해당하는 Item
const TransactionItem = ({ data }) => {
  // 가격 정보 컴포넌트 생성 함수
  const renderPrice = isDeposit => {
    const time = data['거래시간'];

    return (
      <Price>
        {isDeposit ? <Text>입금</Text> : <Text>출금</Text>}
        <Text>
          {time.slice(0, 2) + ':' + time.slice(2, 4) + ':' + time.slice(4)}
        </Text>
        {isDeposit ? (
          <Text>{(data['입금금액'] * 1).toLocaleString('ko-KR')}원</Text>
        ) : (
          <Text>{(data['출금금액'] * -1).toLocaleString('ko-KR')}원</Text>
        )}
      </Price>
    );
  };

  return (
    <Transaction>
      {/* 거래명 출력 */}
      <Name>
        <Text>{data['내용']}</Text>
        <Text>{data['적요']}</Text>
      </Name>
      {/* 입출금 가격 출력 */}
      {renderPrice(parseInt(data['입금금액']))}
    </Transaction>
  );
};

const Transaction = styled.View`
  justify-content: space-between;
  margin: 0 5px 10px 5px;
  flex-direction: row;
`;

const Name = styled.View`
  align-items: flex-start;
`;
const Price = styled.View`
  align-items: flex-end;
`;

export default TransactionItem;
