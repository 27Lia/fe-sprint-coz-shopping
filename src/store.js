import { createStore } from "redux";
import { userReducer } from "./redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["data"], // Redux Persist에 저장할 리듀서 지정
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
