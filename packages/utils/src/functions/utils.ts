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

export const compareTwoArrayOfString = (arr1: string[], arr2: string[]) => {
  const newUniqueArr2 = new Set(arr2);
  return arr1.length === arr2.length && arr1.every((value) => newUniqueArr2.has(value));
};

// currency
export function formatCurrency(number: number) {
  return number?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}
