import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { UserType } from "../types/user";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userObject: null as UserType,
    isAuth: false as boolean,
  },
  reducers: {
    setUserOjbect(state, action: PayloadAction<UserType>) {
      state.userObject = action.payload;
      state.isAuth = !!action.payload;
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

export default authSlice;
