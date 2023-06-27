import { createSlice } from "@reduxjs/toolkit";
import { CheckoutState } from "./interfaces";
import {
  getAddresses,
  getAddress,
  storeAddress,
  updateAddress,
  destroyAddress,
  touchAddress,
} from "./thunks";

const initialState: CheckoutState = {
  addresses: [],
  selectedAddress: undefined,
  addressFormButtonLoading: false,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    reset: (state) => ({
      ...state,
      addresses: [],
      selectedAddress: undefined,
      addressFormButtonLoading: false,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getAddresses.fulfilled, (state, action) => ({
      ...state,
      addresses: action.payload,
      selectedAddress: action.payload[0],
    }));
    builder.addCase(getAddress.fulfilled, (state, action) => ({
      ...state,
      addresses: [action.payload, ...state.addresses],
      selectedAddress: action.payload,
    }));
    builder.addCase(storeAddress.pending, (state, action) => ({
      ...state,
      addressFormButtonLoading: true,
    }));
    builder.addCase(storeAddress.fulfilled, (state, action) => ({
      ...state,
      addresses: action.payload,
      selectedAddress: action.payload[0],
      addressFormButtonLoading: false,
    }));
    builder.addCase(storeAddress.rejected, (state, action) => ({
      ...state,
      addressFormButtonLoading: false,
    }));
    builder.addCase(updateAddress.pending, (state, action) => ({
      ...state,
      addressFormButtonLoading: true,
    }));
    builder.addCase(updateAddress.fulfilled, (state, action) => ({
      ...state,
      addresses: action.payload,
      selectedAddress: action.payload[0],
      addressFormButtonLoading: false,
    }));
    builder.addCase(updateAddress.rejected, (state, action) => ({
      ...state,
      addressFormButtonLoading: false,
    }));
    builder.addCase(destroyAddress.fulfilled, (state, action) => ({
      ...state,
      addresses: action.payload,
      selectedAddress: action.payload[0],
    }));
    builder.addCase(touchAddress.fulfilled, (state, action) => ({
      ...state,
      addresses: action.payload,
      selectedAddress: action.payload[0],
    }));
  },
});
