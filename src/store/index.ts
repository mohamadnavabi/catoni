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
import logger from "redux-logger";

// Reducers
import { ProductReducer } from "./slices";
import mediaRunningReducer from "./mediaRunning/mediaRunning";

// const isDev = process.env.NODE_ENV === "development";
const isDev = false;

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  mediaRunning: mediaRunningReducer,
  product: ProductReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewareLogger: any = !!isDev ? logger : [];

export const store = configureStore({
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
