import { createAsyncThunk } from "@reduxjs/toolkit";
import { Address } from "data/data";
import { addressAPI, paymentAPI } from "services/http/api";
import { shippingAPI } from "services/http/api/Shipping";

export const getAddresses = createAsyncThunk("checkout/getAddresses", () =>
  addressAPI.all()
);

export const getAddress = createAsyncThunk(
  "checkout/getAddress",
  (address: Address) => addressAPI.get(address.id)
);

export const storeAddress = createAsyncThunk(
  "checkout/storeAddress",
  (address: Address) => addressAPI.store(address)
);

export const updateAddress = createAsyncThunk(
  "checkout/updateAddress",
  (address: Address) => addressAPI.update(address.id, address)
);

export const destroyAddress = createAsyncThunk(
  "checkout/destroyAddress",
  (address: Address) => addressAPI.destroy(address.id)
);

export const touchAddress = createAsyncThunk(
  "checkout/touchAddress",
  (address: Address) => addressAPI.touch(address.id)
);

export const getPaymentMethods = createAsyncThunk(
  "checkout/getPaymentMethods",
  () => paymentAPI.all()
);

export const getShippingMethods = createAsyncThunk(
  "checkout/getShippingMethods",
  () => shippingAPI.all()
);
