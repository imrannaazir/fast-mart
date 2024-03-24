import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./features/api/baseApi";
import authSlice from "./features/auth/authSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalSlice from "./features/modal/modalSlice";
import tagSlice from "./features/tag/tagSlice";
import featureNameSlice from "./features/featureName/featureNameSlice";
import filterSlice from "./features/filter/filterSlice";
import { productReducer } from "./features/product/productSlice";
import { cartReducer } from "./features/cart/cartSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const cartPersistConfig = {
  key: "cart",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    modal: modalSlice,
    tags: tagSlice,
    featureName: featureNameSlice,
    filter: filterSlice,
    product: productReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
