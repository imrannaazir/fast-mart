export const ProductStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;
export const ProductUnit = ["kg", "g", "lb", "oz", "ml", "ltr"] as const;
export const ProductSearchableFields = ["title", "description"];
