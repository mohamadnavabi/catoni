import { Attribute, Category, Product } from "data/data";

export interface CategoryState {
  slug: string;
  products: Product[];
  maximumProductPrice: number;
  category: Category | undefined;
  colors: Attribute | undefined;
  sizes: Attribute | undefined;
}
