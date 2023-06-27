import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import logger from "redux-logger";

// Reducers
import { mediaRunningSlice } from "./mediaRunning/mediaRunning";
import { authSlice, cartSlice, checkoutSlice, productSlice } from "./slices";
import { categorySlice } from "./slices/category";

// const isDev = process.env.NODE_ENV === "development";
const isDev = false;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY as string,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};

const rootReducer = combineReducers({
  [mediaRunningSlice.name]: mediaRunningSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [checkoutSlice.name]: checkoutSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareLogger: any = !!isDev ? logger : [];

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewareLogger),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
