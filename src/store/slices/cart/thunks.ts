import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartAPI } from "services/http/api";
import { CartItem } from "./interfaces";

export const storeCart = createAsyncThunk(
  "cart/storeCart",
  (items: CartItem[]) => cartAPI.store(items)
);

export const getCart = createAsyncThunk("cart/getCart", () => cartAPI.get());

export const addToCart = createAsyncThunk("cart/addToCart", (item: CartItem) =>
  cartAPI.addToCart(item)
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  (params: CartItem) => cartAPI.updateQuantity(params)
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  (params: CartItem) => cartAPI.removeItem(params)
);
