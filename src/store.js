import { createStore } from "redux";
import { userReducer } from "./redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isLoggedIn", "data"], // 영속화할 상태 지정
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
