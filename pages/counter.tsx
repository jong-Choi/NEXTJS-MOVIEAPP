import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { counterSlice } from "./_app";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counterForStore.value);

  return (
    <div>
      {" "}
      {count}
      <button
        onClick={() => {
          // dispatch({ type: "counter/up", step: 2 });
          dispatch(counterSlice.actions.up(2));
        }}
      >
        더하기
      </button>
    </div>
  );
}

export default Counter;
