import { createSlice } from "@reduxjs/toolkit";
import { OrderState } from "./interfaces";
import { getOrders, storeOrder } from "./thunks";
import { Paginate } from "services/http/interface";

const initialState: OrderState = {
  list: [],
  activeOrder: undefined,
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      orders: [],
      loading: false,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(getOrders.fulfilled, (state, action) => ({
        ...state,
        list: [action.payload, ...state.list],
        loading: false,
      }))
      .addCase(getOrders.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      });
    builder
      .addCase(storeOrder.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(storeOrder.fulfilled, (state, action) => ({
        ...state,
        activeOrder: action.payload,
        loading: false,
      }))
      .addCase(storeOrder.rejected, (state, action) => ({
        ...state,
        loading: false,
      }));
  },
});
