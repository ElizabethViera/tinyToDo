import React from "react";
import "./App.css";

function useLocalStorageState<T>(
  initial: T,
  name: string
): [T, (newValue: T) => void] {
  const item = window.localStorage.getItem(name);
  const [state, setState] = React.useState<T>(
    item ? JSON.parse(item) : initial
  );
  return [
    state,
    (newValue) => {
      setState(newValue);
      window.localStorage.setItem(name, JSON.stringify(newValue));
    },
  ];
}

function App() {
  const [items, setItems] = useLocalStorageState<string[]>(
    ["first", "second", "third", "fourth"],
    "items"
  );

  return (
    <div>
      <h1>To Do:</h1>
      {items.map((i) => (
        <div id={i}>
          {" "}
          <input type="checkbox"></input>{" "}
          <input type="text" id="{i}" name="{i}"></input>
        </div>
      ))}
      <div>
        <button
          id="AddNew"
          onClick={() => {
            const newTodo = "";

            setItems(items.concat([newTodo]));
          }}
        >
          Add New TODO
        </button>
      </div>
    </div>
  );
}

export default App;
