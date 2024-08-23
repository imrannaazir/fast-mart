export const calculateOfferPercentage = (
  price: number,

  comparePrice: number
) => {
  const diffPrice = comparePrice - price;
  const offerPercentage = (diffPrice / price) * 100;
  return offerPercentage.toFixed(2);
};
