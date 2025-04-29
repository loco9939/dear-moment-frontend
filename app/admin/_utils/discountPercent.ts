export const discountPercent = (original: number, discounted: number) => {
  return Math.round(((original - discounted) / original) * 100);
};
