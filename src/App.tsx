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

const ToDo = ({ id }: { id: string }) => {
  const [label, setLabel] = useLocalStorageState<string>("", "label");
  return (
    <div className="label-wrapper">
      <input
        id={`label ${id}`}
        type="text"
        value={label}
        onChange={(e) => setLabel(e.currentTarget.value)}
      />
    </div>
  );
};

const Checkbox = ({ id }: { id: string }) => {
  const [isChecked, setIsChecked] = useLocalStorageState<boolean>(
    false,
    "checkbox"
  );
  return (
    <div className="checkbox-wrapper">
      <input
        id={`checkbox ${id}`}
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
    <div id="todo-wrapper">
      <h1>To Do:</h1>
      {items.map((i) => (
        <div id={`item ${i}`}>
          <Checkbox id={i} />
          <ToDo id={i} />
        </div>
      ))}
      <div id="add-new-item-wrapper">
        <button
          id="AddNew"
          onClick={() => {
            const newTodo = items.length.toString();

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
