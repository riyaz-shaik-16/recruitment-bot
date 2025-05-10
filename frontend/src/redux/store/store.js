import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createIndexedDBStorage from "redux-persist-indexeddb-storage";
import userReducer from "../slices/user.slice"
// import chatReducer from "../slices/chat.slice"
 
const persistUserConfig = {
  key: "user",
  storage: createIndexedDBStorage("myReduxDB"),
};

// const persistChatConfig = {
//   key:"messages",
//   storage: createIndexedDBStorage("myMessageDB")
// }

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
// const persistedChatReducer = persistReducer(persistChatConfig, chatReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    // chat: persistedChatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
