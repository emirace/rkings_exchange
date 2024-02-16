export interface Size {
  size: string;
  quantity: number;
}

export interface ProductProps {
  _id: string;
  name: string;
  description?: string;
  countInStock: number;
  createdAt?: string;
  images: string[]; // Array of image URLs
  tags: string[]; // Array of tags
  brand: string;
  colors: string[]; // Array of available colors
  category: string;
  sizes: Size[]; // Array of available sizes
  sellingPrice: number; // Selling price
  costPrice: number; // Cost price
  baseSellingPrice: number; // Selling price
  baseCostPrice: number; // Cost price
  material: string;
  currency: string;
}
