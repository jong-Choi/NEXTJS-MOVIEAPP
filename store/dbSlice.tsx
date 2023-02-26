import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Article } from "../types/article";

const dbSlice = createSlice({
  name: "dbSlice",
  initialState: {
    dbValidate: 0,
    articles: [] as Array<Article>,
    trendingArticles: [] as Array<Article>,
  },
  reducers: {
    setArticles(state, action: PayloadAction<Array<Article>>) {
      state.articles = action.payload;
    },
    shiftArticles(state, action: PayloadAction<Article>) {
      state.articles = [action.payload, ...state.articles];
    },
    setTrendingArticles(state, action: PayloadAction<Array<Article>>) {
      state.trendingArticles = action.payload;
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
export const { setArticles, setTrendingArticles, shiftArticles } =
  dbSlice.actions;
