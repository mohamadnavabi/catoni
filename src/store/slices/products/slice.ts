import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductState } from "./interfaces";
import { getBestSaleProducts, getLastProducts, getProducts } from "./thunks";

const initialState: ProductState = {
  lastProducts: [],
  bestSaleProducts: [],
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getProducts.fulfilled,
      (state, action: PayloadAction<ProductState["products"]>) => {
        state.products = action.payload;
      }
    );
    builder.addCase(getLastProducts.fulfilled, (state, action) => {
      state.lastProducts = action.payload;
    });
    builder.addCase(getBestSaleProducts.fulfilled, (state, action) => {
      state.bestSaleProducts = action.payload;
    });
  },
});
