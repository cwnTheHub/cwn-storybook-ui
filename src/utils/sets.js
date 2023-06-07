const difference = (start, compare) => {
  const setDifference = new Set(start);

  compare.forEach((element) => setDifference.delete(element));

  return setDifference;
};

export const isEqual = (setA, setB) => {
  const differenceAtoB = difference(setA, setB);
  const differenceBtoA = difference(setB, setA);

  return differenceAtoB.size === 0 && differenceBtoA.size === 0;
};
