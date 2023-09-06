export const getUniqueListBy = <T>(arr: Array<T>, key: keyof T) => {
  return arr.filter(
    (item, index, self) => self.findIndex((t) => t[key] === item[key]) === index
  );
};
