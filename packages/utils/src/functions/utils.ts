export const calculateOfferPercentage = (
  price: number,

  comparePrice: number
) => {
  const diffPrice = comparePrice - price;
  const offerPercentage = (diffPrice / price) * 100;
  return Math.ceil(offerPercentage);
};

export const hexToRgba = (hex: string, opacity: number) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const debounce = (fn: (...args: unknown[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
