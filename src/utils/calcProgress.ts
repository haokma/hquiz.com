export const calcProgress = (total: number, length: number) => {
  console.log({ total, length });
  if (!total || !length) return 0;
  return Math.floor(total / length);
};
