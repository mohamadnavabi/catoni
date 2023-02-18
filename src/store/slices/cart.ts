import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "data/data";
import { WritableDraft } from "immer/dist/internal";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  tax: number;
  shipping: number;
  discount: number;
  totalWithoutDiscount: number;
  total: number;
}

const initialState: CartState = {
  items: [],
  tax: 0,
  shipping: 0,
  discount: 0,
  totalWithoutDiscount: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const findedIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.variants[0].id === action.payload.variants[0].id
      );
      const items =
        findedIndex === -1
          ? state.items.concat(action.payload)
          : state.items
              .filter((item) => item.id !== action.payload.id)
              .concat({
                ...action.payload,
                quantity:
                  state.items[findedIndex].quantity + action.payload.quantity,
              });

      state = handleState(state, items);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const findedIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.variants[0].id === action.payload.variants[0].id
      );
      const items = state.items.filter((item, index) => index !== findedIndex);

      state = handleState(state, items);
    },
    updateQty: (state, action: PayloadAction<CartItem>) => {
      const findedIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.variants[0].id === action.payload.variants[0].id
      );
      const items = state.items.map((item, index) => {
        if (index === findedIndex) item.quantity = action.payload.quantity;
        return item;
      });

      state = state = handleState(state, items);
    },
  },
  extraReducers: (builder) => {},
});

export const { addToCart, removeFromCart, updateQty } = cartSlice.actions;

export default cartSlice.reducer;

function handleState(
  state: WritableDraft<CartState>,
  items: CartItem[]
): CartState {
  return Object.assign(state, {
    items,
    tax: 0,
    shipping: 0,
    discount: items.reduce(
      (prev, current) =>
        prev +
        (current.sale_price > 0 ? current.sale_price - current.price : 0) *
          current.quantity,
      0
    ),
    totalWithoutDiscount: items.reduce(
      (prev, current) => prev + current.price * current.quantity,
      0
    ),
    total: items.reduce(
      (prev, current) =>
        prev +
        (current.sale_price > 0 ? current.sale_price : current.price) *
          current.quantity,
      0
    ),
  });
}
