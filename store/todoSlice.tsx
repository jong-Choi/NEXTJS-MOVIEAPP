import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../types/todo";
import { HYDRATE } from "next-redux-wrapper";

const todoSlice = createSlice({
  name: "todoSlice",
  initialState: {
    todos: [
      { id: 1, text: "마트 가서 장보기", color: "RED", checked: false },
      { id: 2, text: "수학 숙제하기", color: "ORANGE", checked: true },
      { id: 3, text: "투두리스트 만들기", color: "YELLOW", checked: false },
      {
        id: 4,
        text: "마트가서 투두리스트 만드는 숙제하기",
        color: "RED",
        checked: false,
      },
    ] as TodoType[],
  },
  reducers: {
    newTodo(state, action: PayloadAction<TodoType>) {
      state.todos.push(action.payload);
    },
    deleteTodo(state, action: PayloadAction<TodoType>) {
      console.log(state.todos.indexOf(action.payload));
      state.todos.splice(
        state.todos.findIndex((todo) => todo.id === action.payload.id),
        1,
      );
    },
    updateTodo(state, action: PayloadAction<TodoType>) {
      state.todos.splice(
        state.todos.findIndex((todo) => todo.id === action.payload.id),
        1,
        action.payload,
      );
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

export default todoSlice;
