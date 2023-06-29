import { Attribute, Product } from "data/data";

export interface CategoryState {
  slug: string;
  products: Product[];
  maximumProductPrice: number;
  category: Category | undefined;
  colors: Attribute | undefined;
  sizes: Attribute | undefined;
}

export interface Category {
  active: number;
  description: null | string;
  icon: null | string;
  id: number;
  name: string;
  parent_id: number | null;
  pivot: { product_id: number; category_id: number };
  slug: string;
  type: "product" | "post";
  created_at: null | string;
  updated_at: null | string;
}
