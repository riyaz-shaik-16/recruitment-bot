import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import userReducer from "../slices/user.slice"
import sessionReducer from "../slices/session.slice"
 
const persistUserConfig = {
  key: "user",
  storage: createIndexedDBStorage("myReduxDB"),
};

// const persistSessionConfig = {
//   key:"sessions",
//   storage: createIndexedDBStorage("myReduxDB")

// }

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
// const persistedSessionReducer = persistReducer(persistSessionConfig,sessionReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    sessions:sessionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
