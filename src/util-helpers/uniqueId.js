let idCounter = 0;

const uniqueId = (prefix) => {
  const id = ++idCounter;
  return `${prefix}${id}`;
};

export default uniqueId;
