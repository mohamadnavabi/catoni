import { createSlice } from "@reduxjs/toolkit";
import { compareCart, handleExpenses } from "./helpers";
import { CartState } from "./interfaces";
import {
  addToCart,
  getCart,
  removeItem,
  storeCart,
  updateQuantity,
} from "./thunks";
import _ from "lodash";

const initialState: CartState = {
  items: [],
  tax: 0,
  shipping: 0,
  discount: 0,
  totalWithoutDiscount: 0,
  total: 0,
  loading: false,
  error: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => ({
      items: [],
      tax: 0,
      shipping: 0,
      discount: 0,
      totalWithoutDiscount: 0,
      total: 0,
      loading: false,
      error: false,
    }),
  },
  extraReducers: (builder) => {
    // storeCart
    builder
      .addCase(storeCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(storeCart.fulfilled, (state, action) => {
        const items = compareCart(state.items, action.payload);
        const expenses = handleExpenses(items);
        return {
          ...state,
          ...expenses,
          items,
          loading: false,
          error: false,
        };
      })
      .addCase(storeCart.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
      }));
    // getCart
    builder
      .addCase(getCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const items = compareCart(state.items, action.payload);
        const expenses = handleExpenses(items);
        return {
          ...state,
          ...expenses,
          items,
          loading: false,
          error: false,
        };
      })
      .addCase(getCart.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
      }));
    // addToCart
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const items = compareCart(state.items, action.payload);
        const expenses = handleExpenses(items);
        return {
          ...state,
          ...expenses,
          items,
          loading: false,
          error: false,
        };
      })
      .addCase(addToCart.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
      }));
    // updateQuantity
    builder
      .addCase(updateQuantity.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const items = _.cloneDeep(state.items).map((item) => {
          if (item.variants.length) {
            if (item.variants[0].id === action.meta.arg.variants[0].id)
              item.quantity = action.meta.arg.quantity;
          } else if (item.id === action.meta.arg.id) {
            item.quantity = action.meta.arg.quantity;
          }

          return item;
        });
        const expenses = handleExpenses(items);

        return {
          ...state,
          ...expenses,
          items,
          loading: false,
          error: false,
        };
      })
      .addCase(updateQuantity.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
      }));
    // removeItem
    builder
      .addCase(removeItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const items = state.items.filter((item) => {
          if (item.variants.length)
            return item.variants[0].id !== action.meta.arg.variants[0].id;
          return item.id !== action.meta.arg.id;
        });
        const expenses = handleExpenses(items);

        return {
          ...state,
          ...expenses,
          items,
          loading: false,
          error: false,
        };
      })
      .addCase(removeItem.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: true,
      }));
  },
});
