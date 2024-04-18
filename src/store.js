import { createStore, applyMiddleware } from "redux";
import { userReducer } from "./redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk"; // Redux Thunk 미들웨어 임포트

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isLoggedIn", "products"],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
