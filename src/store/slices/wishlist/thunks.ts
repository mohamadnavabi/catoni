import { createAsyncThunk } from "@reduxjs/toolkit";
import { wishlistAPI } from "services/http/api";
import { WishlistParams } from "./interfaces";

export const getWishlist = createAsyncThunk("checkout/getWishlist", () =>
  wishlistAPI.all()
);

export const addToWishlist = createAsyncThunk(
  "checkout/addToWishlist",
  (data: WishlistParams) => wishlistAPI.store(data)
);

export const removeFromWishlist = createAsyncThunk(
  "checkout/removeFromWishlist",
  (productId: number) => wishlistAPI.destroy(productId)
);
