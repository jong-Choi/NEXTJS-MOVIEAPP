import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const dbSlice = createSlice({
  name: "dbSlice",
  initialState: {
    dbValidate: 0,
  },
  reducers: {
    setDbValidate(state, action: PayloadAction<number>) {
      state.dbValidate = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default dbSlice;
export const { setDbValidate } = dbSlice.actions;
