import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "./interfaces";
import {
  getCategory,
  getColorAttributeItems,
  getMaximumProductPrice,
  getProductsByCategory,
  getSizeAttributeItems,
} from "./thunks";

const initialState: CategoryState = {
  slug: "",
  products: [],
  maximumProductPrice: 0,
  category: undefined,
  colors: undefined,
  sizes: undefined,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSlug: (state, action) => ({
      ...state,
      slug: action.payload,
    }),
    reset: (state) => ({
      ...state,
      slug: "",
      products: [],
      maximumProductPrice: 0,
      category: undefined,
      colors: undefined,
      sizes: undefined,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => ({
        ...state,
        category: action.payload,
      }))
      .addCase(getProductsByCategory.fulfilled, (state, action) => ({
        ...state,
        products: action.payload.data,
      }))
      .addCase(getMaximumProductPrice.fulfilled, (state, action: any) => ({
        ...state,
        maximumProductPrice: action.payload,
      }))
      .addCase(getColorAttributeItems.fulfilled, (state, action: any) => ({
        ...state,
        colors: action.payload,
      }))
      .addCase(getSizeAttributeItems.fulfilled, (state, action: any) => ({
        ...state,
        sizes: action.payload,
      }));
  },
});
