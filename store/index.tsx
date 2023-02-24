import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSeletor,
} from "react-redux";
import authSlice from "./authSlice";
import dbSlice from "./dbSlice";

const reducers = combineReducers({
  authSlice: authSlice.reducer,
  dbSlice: dbSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: storageSession,
};

//https://choyeon-dev.tistory.com/14
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const makeStore = () => store;

const wrapper = createWrapper(makeStore);
export default wrapper;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> =
  useReduxSeletor;
