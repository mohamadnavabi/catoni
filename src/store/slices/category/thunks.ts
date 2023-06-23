import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  attributeAPI,
  categoryAPI,
  CategoryParams,
  productAPI,
} from "services/http/api";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (categorySlug: string) => categoryAPI.get(categorySlug)
);

export const getProductsByCategory = createAsyncThunk(
  "category/getProductsByCategory",
  (categoryParams: CategoryParams) =>
    productAPI.getProductsByCategory(categoryParams)
);

export const getMaximumProductPrice = createAsyncThunk(
  "category/getMaximumProductPrice",
  (categorySlug: string) => productAPI.getMaximumProductPrice(categorySlug)
);

export const getColorAttributeItems = createAsyncThunk(
  "category/getColorAttributeItems",
  () => attributeAPI.get("color")
);

export const getSizeAttributeItems = createAsyncThunk(
  "category/getSizeAttributeItems",
  () => attributeAPI.get("size")
);
