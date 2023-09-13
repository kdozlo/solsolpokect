// 0 - 9까지 숫자를 shuffle해서 새로운 숫자 배열을 return
export const shuffleNumber = numbers => {
  // console.log(numbers);
  // console.log([1, 2, 3].toSorted());
  return [...numbers].sort(() => Math.random() - 0.5);
};
