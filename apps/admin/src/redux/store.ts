import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import baseApi from "./features/api/baseApi";
import authSlice from "./features/auth/authSlice";
import filterSlice from "./features/filter/filterSlice";
import headerReducer from "./features/header/header-slice";
import { alertModalReducer } from "./features/modal/alertModal.slice";
import modalSlice from "./features/modal/modalSlice";
import tagSlice from "./features/tag/tagSlice";

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    modal: modalSlice,
    tags: tagSlice,
    filter: filterSlice,
    alertModal: alertModalReducer,
    header: headerReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: false,
      /* 
      {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
      */
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
