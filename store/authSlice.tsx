import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Article } from "../types/article";
import { ProfileDataType } from "../types/profile";
import { UserType } from "../types/user";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userObject: null as UserType,
    isAuth: false as boolean,
    myArticles: [] as Array<Article>,
    userProfile: {
      uid: "",
      nickname: "",
      image: "",
      myMovies: [],
      myRecommendations: [],
      followers: [],
      followings: [],
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
    setMyArticles(state, action) {
      state.myArticles = action.payload;
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
export const {
  setUserOjbect,
  setUserProfile,
  patchUserProfile,
  setMyArticles,
} = authSlice.actions;
