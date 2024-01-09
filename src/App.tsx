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

const ToDo = () => {
  const [label, setLabel] = useLocalStorageState<string>("", "label");
  return (
    <div className="label-wrapper">
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.currentTarget.value)}
      />
    </div>
  );
};

const Checkbox = () => {
  const [isChecked, setIsChecked] = useLocalStorageState<boolean>(
    false,
    "checkbox"
  );
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(prev) => setIsChecked(!prev)}
      />
    </div>
  );
};

function App() {
  const [items, setItems] = useLocalStorageState<string[]>([], "items");

  return (
    <div>
      <h1>To Do:</h1>
      {items.map((i) => (
        <div id={`item ${i}`}>
          <Checkbox />
          <ToDo />
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
