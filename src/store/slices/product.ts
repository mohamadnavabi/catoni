import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "services/http/api";

export interface ProductState {
  lastProducts: [];
  bestSaleProducts: [];
  products: [];
}

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

export const getLastProducts: any = createAsyncThunk(
  "products/getLastProducts",
  async () => {
    const res = await Product.all(5, "created_at", "desc");
    return res.data;
  }
);

export const getBestSaleProducts: any = createAsyncThunk(
  "products/getBestSaleProducts",
  async () => {
    const res = await Product.all(5, "sale_count", "desc");
    return res.data;
  }
);

export const getProducts: any = createAsyncThunk(
  "products/getProducts",
  async () => {
    const res = await Product.all(20);
    return res.data;
  }
);

export const findProductBySlug: any = createAsyncThunk(
  "products/findProductBySlug",
  async ({ slug }: { slug: string }) => {
    const res = await Product.findBySlug(slug);
    return res.data;
  }
);

export default productSlice.reducer;
