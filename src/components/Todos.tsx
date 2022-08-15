export function Todos({ todo, todos, setTodos }) {
  return (
    <li className={todo.completed ? "completed-todo" : "uncompleted-todo"}>
      <span
        onClick={() => {
          const todosCopy = structuredClone(todos);

          const match = todosCopy.find((target) => target.id === todo.id);

          match.completed = !match.completed;
          fetch(`http://localhost:3000/todos/${match.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(match),
          });

          setTodos(todosCopy);
        }}
      >
        <h3>{todo.content}</h3>
      </span>
      <button
        className="deleteButton"
        onClick={() => {
          const todosCopy = structuredClone(todos);

          const dele = todosCopy.find((dele) => dele.id === todo.id);

          fetch(`http://localhost:3000/todos/${dele.id}`, {
            method: "DELETE",
          })
            .then((resp) => resp.json())
            .then(() => location.reload());
        }}
      >
        {" "}
        Delete{" "}
      </button>
    </li>
  );
}
