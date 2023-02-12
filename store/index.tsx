import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useReduxSeletor,
} from "react-redux";
import authSlice from "./authSlice";
import dbSlice from "./dbSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    dbSlice: dbSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const makeStore = () => store;

const wrapper = createWrapper(makeStore);
export default wrapper;

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> =
  useReduxSeletor;
