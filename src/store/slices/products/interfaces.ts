import { AttributeItems, Guarantees, Media, Tags } from "data/data";
import { Category } from "../category";

export interface ProductState {
  lastProducts: [];
  bestSaleProducts: [];
  products: [];
}

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
  price: number;
  sale_price: number;
  sku: string;
  description: string;
  short_description: string;
  date_on_publish_from: null | string;
  date_on_publish_to: null | string;
  date_on_sale_from: null | string;
  date_on_sale_to: null | string;
  editor_id: null | number;
  notice: null | string;
  publisher_id: number;
  purchase_price: string;
  rating_count: number;
  barcode: null | string;
  brand_id: number;
  sale_count: number;
  stock_status: StockStatus;
  stock_quantity: null | number;
  is_original: Boolean;
  is_featured: Boolean;
  is_purchasable: Boolean;
  is_special_offer: Boolean;
  is_backorder: Boolean;
  supplier_id: null | number;
  rating_average: number;
  is_taxable: number;
  type: string;
  video: null | string;
  view_count: number;
  warehouse_name: null | number;
  warehouse_shelf_name: null | number;
  depth: null | number;
  weight: null | number;
  width: null | number;
  height: null | number;
  weight_unit: string;
  length_unit: string;
  count_unit: string;
  categories: Category[];
  guarantees: Guarantees[];
  tags: Tags[];
  media: Media[];
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface ProductVariant {
  id: number;
  attribute_items: AttributeItems[];
  sku: null | string;
  barcode: string;
  date_on_sale_from: null | string;
  date_on_sale_to: null | string;
  notice: null | string;
  price: number;
  product_id: number;
  purchase_price: number;
  sale_price: number;
  stock_quantity: null;
  stock_status: StockStatus;
  is_special_offer: Boolean;
  warehouse_name: null | string;
  warehouse_shelf_name: null | string;
  weight: null | number;
  width: null | number;
  height: null | number;
  depth: null | number;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}
