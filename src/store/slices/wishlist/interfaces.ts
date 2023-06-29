import { Product } from "../products";

export interface WishlistState {
  list: Wishlist[];
  loading: boolean;
}

export interface WishlistParams {
  product_id: number;
}

export interface Wishlist {
  id: number;
  product: Product;
  product_id: number;
  updated_at: string;
  user_id: string;
  created_at: string;
  deleted_at: null;
}
