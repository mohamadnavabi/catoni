import { createSlice, current } from "@reduxjs/toolkit";
import { WishlistState } from "./interfaces";
import { addToWishlist, getWishlist, removeFromWishlist } from "./thunks";
import { toast } from "react-hot-toast";

const initialState: WishlistState = {
  list: [],
  loading: false,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      list: [],
      loading: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(getWishlist.fulfilled, (state, action) => ({
        ...state,
        list: action.payload.data,
        loading: false,
      }))
      .addCase(getWishlist.rejected, (state, action) => ({
        ...state,
        loading: false,
      }));
    builder
      .addCase(addToWishlist.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(addToWishlist.fulfilled, (state, action) => {
        toast.success("محصول به لیست علاقه‌مندی اضافه شد");
        return {
          ...state,
          list: [action.payload, ...state.list],
          loading: false,
        };
      })
      .addCase(addToWishlist.rejected, (state, action) => ({
        ...state,
        loading: false,
      }));
    builder
      .addCase(removeFromWishlist.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        toast.success("محصول از لیست علاقه‌مندی حذف شد");
        return {
          ...state,
          list: state.list.filter((item) => item.product.id !== action.payload),
          loading: false,
        };
      })
      .addCase(removeFromWishlist.rejected, (state, action) => ({
        ...state,
        loading: false,
      }));
  },
});
