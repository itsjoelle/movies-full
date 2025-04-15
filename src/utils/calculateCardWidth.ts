export const calcCardWith = (windowSize: number) => {
  const edge = windowSize >= 1025 ? 80 : 50;
  const amount =
    windowSize < 380
      ? 1
      : windowSize < 550
      ? 2
      : windowSize < 820
      ? 3
      : windowSize < 1400
      ? 4
      : 5;

  const distances = amount * 10;
  const width = (windowSize - edge - distances) / amount;
  return width;
};
