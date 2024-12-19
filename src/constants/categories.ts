export const CUISINE_CATEGORIES = [
  'All',
  'Italian',
  'Japanese',
  'Mexican',
  'Indian',
  'Thai',
  'Mediterranean',
  'American',
] as const;

export type CuisineCategory = typeof CUISINE_CATEGORIES[number];