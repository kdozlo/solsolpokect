// 0 - 9까지 숫자를 shuffle해서 새로운 숫자 배열을 return
export const shuffleNumber = numbers => {
  // console.log(numbers);
  // console.log([1, 2, 3].toSorted());
  return [...numbers].sort(() => Math.random() - 0.5);
};

export const formatKoreanMoney = number => {
  const result = '';

  // const units = ['조', '억', '만', ''];
  const units = ['', '만', '억', '조', '경'];
  let numberString = String(number);

  const groups = [];
  while (numberString.length > 0) {
    groups.unshift(numberString.slice(-4));
    numberString = numberString.slice(0, -4);
  }
  console.log(groups);

  const formattedGroups = groups.map((group, index) => {
    let result = group;

    // 앞에 붙은 0은 제거
    let groupIndex = 0;
    const groupLen = group.length;
    while (groupIndex < groupLen) {
      if (group[groupIndex] != 0) {
        break;
      }
      result = group.slice(1);
      groupIndex++;
    }
    const formattedGroup = `${result} ${units[groups.length - 1 - index]}`;
    return formattedGroup.trim();
  });

  console.log(formattedGroups);

  const formattedMoney = formattedGroups.filter(group => group !== '').join(' ');
  return `${formattedMoney}`;
};
