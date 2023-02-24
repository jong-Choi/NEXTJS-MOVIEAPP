import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ProfileDataType } from "../types/profile";
import { UserType } from "../types/user";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userObject: null as UserType,
    isAuth: false as boolean,
    userProfile: {
      uid: "",
      nickname: "",
      image: "",
      myMovies: [],
      myRecommendations: [],
    } as ProfileDataType,
  },
  reducers: {
    setUserOjbect(state, action: PayloadAction<UserType>) {
      state.userObject = action.payload;
      state.isAuth = !!action.payload;
    },
    setUserProfile(state, action: PayloadAction<ProfileDataType>) {
      state.userProfile = action.payload;
    },
    patchUserProfile(state, action) {
      state.userProfile = { ...state.userProfile, ...action.payload };
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
export const { setUserOjbect, setUserProfile, patchUserProfile } =
  authSlice.actions;
