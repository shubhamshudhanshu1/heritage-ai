"use client";
import { renderComponents } from "@/helper/utils";
import { decrement, increment } from "@/redux/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  let schemas = [
    {
      type: "select",
      default: "default value",
      id: "myName",
      info: "",
      label: "Name",
      options: [],
    },
  ];
  return (
    <main className="h-screen">
      <div>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
      <div className="w-screen">
        {schemas.map((schema) => {
          return renderComponents(schema);
        })}
      </div>
    </main>
  );
}
