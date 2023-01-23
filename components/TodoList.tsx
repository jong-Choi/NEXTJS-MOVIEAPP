import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import todoSlice from "../store/todoSlice";
import { TodoType } from "../types/todo";

const TodoList: React.FC = () => {
  const todos = useSelector((state) => state.todoSlice.todos);
  const dispatch = useDispatch();

  const [newText, setNewText] = useState("");
  const [newColor, setNewColor] = useState<TodoType["color"]>("RED");

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value: TodoType["color"] = e.target.value;
    setNewColor(value);
  };

  const createTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = todos[todos.length - 1].id + 1;
    dispatch(
      todoSlice.actions.newTodo({
        id: newId,
        text: newText,
        color: newColor,
        checked: false,
      }),
    );
    setNewText("");
  };

  const onChecked = (payload) => {
    dispatch(
      todoSlice.actions.updateTodo({
        ...payload,
        checked: !payload.checked,
      }),
    );
  };

  return (
    <div>
      <h1>TodoList</h1>
      <p>남은 TODO {todos.length}개</p>
      <form onSubmit={createTodo}>
        <input
          name="text"
          type="text"
          placeholder="할 일을 입력하세요"
          onChange={(e) => setNewText(e.target.value)}
          value={newText}
        />
        <select name="color" onChange={onSelect} value={newColor}>
          <option value="RED">RED</option>
          <option value="ORANGE">ORANGE</option>
          <option value="YELLOW">YELLOW</option>
        </select>
        <button type="submit">작성하기</button>
      </form>
      <ul>
        {todos.map((todo, index) => {
          return (
            <>
              <li key={todo.id} onClick={() => onChecked(todo)}>
                <span>{todo.checked ? "O" : "X"}</span>
                <span>{todo.text}</span>
                <span>{todo.color}</span>
              </li>
              <button
                type="button"
                onClick={() => dispatch(todoSlice.actions.deleteTodo(todo))}
              >
                삭제하기
              </button>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
