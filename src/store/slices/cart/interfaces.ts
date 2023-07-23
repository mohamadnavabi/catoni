import { Product } from "data/data";

export interface MessagesType {
  color: "blue" | "red" | "green" | "yellow";
  title: string;
  body?: string;
}

export interface CartItem extends Product {
  quantity: number;
  item_id?: number;
  message?: MessagesType;
}

export interface CartState {
  items: CartItem[];
  tax: number;
  shipping: number;
  discount: number;
  totalWithoutDiscount: number;
  total: number;
  loading: boolean;
  error: boolean;
}
