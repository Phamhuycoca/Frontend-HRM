import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import { authReducer } from "./slice";
// Ghi nhớ các key ko bị mất khi reload
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["menu", "vai_tro", "accessToken", "nguoi_dung_id", "permissions", "isAuthenticated"],
};
const userPersistConfig = {
    key: "user",
    storage,
    whitelist: [
        "id",
        "ten_day_du",
        "anh_dai_dien",
        "gioi_tinh_id",
        "ten_dang_nhap"
    ]
};
export const persistedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  user: persistReducer(userPersistConfig, authReducer)
});
