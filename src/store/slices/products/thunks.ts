import { createAsyncThunk } from "@reduxjs/toolkit";
import { productAPI } from "services/http/api";

export const getLastProducts: any = createAsyncThunk(
  "products/getLastProducts",
  async () => {
    const result = await productAPI.all(5, "created_at", "desc");
    return result.data;
  }
);

export const getBestSaleProducts: any = createAsyncThunk(
  "products/getBestSaleProducts",
  async () => {
    const result = await productAPI.all(5, "sale_count", "desc");
    return result.data;
  }
);

export const getProducts: any = createAsyncThunk(
  "products/getProducts",
  async () => {
    const result = await productAPI.all(20);
    return result;
  }
);

export const findProductBySlug: any = createAsyncThunk(
  "products/findProductBySlug",
  async ({ slug }: { slug: string }) => {
    const result = await productAPI.findBySlug(slug);
    return result;
  }
);
