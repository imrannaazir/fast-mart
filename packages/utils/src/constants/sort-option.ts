const SortByOptions = Object.freeze({
  BEST_MATCH: "best_match",
  TOP_SALE: "top_sale",
  HIGH: "high",
  LOW: "low",
  NEWEST: "newest",
  RATING: "rating",
  NAME: "name_az",
});

export const sortOptions = [
  { label: "Best Match", value: SortByOptions.BEST_MATCH },
  { label: "Top Sale", value: SortByOptions.TOP_SALE },
  { label: "Price: High to Low", value: SortByOptions.HIGH },
  { label: "Price: Low to High", value: SortByOptions.LOW },
  { label: "Newest", value: SortByOptions.NEWEST },
  { label: "Rating", value: SortByOptions.RATING },
  { label: "Name: A to Z", value: SortByOptions.NAME },
];

export const productsPerViewOptions = [
  { label: "20", value: 20 },
  { label: "24", value: 24 },
  { label: "48", value: 48 },
  { label: "75", value: 75 },
  { label: "90", value: 90 },
];
