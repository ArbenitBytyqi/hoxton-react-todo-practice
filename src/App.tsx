import { useEffect, useState } from "react";
import "./App.css";
import { Todos } from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((resp) => resp.json())
      .then((todosFromServer) => setTodos(todosFromServer));
  }, []);

  function createTodo(text: string) {
    let newTodo = {
      content: text,
      completed: false,
    };

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((resp) => resp.json())
      .then((todosFromServer) => {
        setTodos([...todos, todosFromServer]);
      });
  }

  return (
    <div className="App">
      <h1>Arbi's Todos</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createTodo(event.target.content.value);
          event.target.reset();
        }}
      >
        <input
          className="todo-input"
          type="text"
          placeholder="Add a todo"
          name="content"
          required
        />
        <button className="add-btn">ADD</button>
      </form>

      <ul className="todoList">
        {todos.map((todo) => (
          <Todos todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      </ul>
    </div>
  );
}

export default App;
