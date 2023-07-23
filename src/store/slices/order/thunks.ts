import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderAPI } from "services/http/api";

export const getOrders = createAsyncThunk(
  "order/getOrders",
  (pageNumber: number) => orderAPI.all(pageNumber)
);

export const storeOrder = createAsyncThunk("order/storeOrder", (data: any) =>
  orderAPI.store(data)
);
