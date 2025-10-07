import React, { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Do you sure want to log out?");
    if (confirmLogout) {
      setIsLoggedIn(false);
    }
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    const newTask = { text: newTodo, completed: false };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const ongoingTasks = todos.filter((t) => !t.completed);
  const completedTasks = todos.filter((t) => t.completed);

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  return (
    <div className="page-center">

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSidebarOpen(false)}>
          ×
        </button>
        <h2>Menu</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <button
          className="link-btn"
          onClick={() =>
            (window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0")
          }>
          Easter egg
        </button>
     <button
          className="link-github"
          onClick={() =>
            (window.location.href = "https://github.com/astrNVlik/To-do-List-with-Login")
          }>
          GitHub Page
        </button>

      </div>


      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>

      <div className="todo-card">
        <h1>To-Do List</h1>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <div className="todo-sections">

          <div className="todo-section">
            <h2>Ongoing</h2>
            {ongoingTasks.length > 0 ? (
              <ul>
                {ongoingTasks.map((todo, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                    />
                    <span>{todo.text}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-text">No ongoing tasks :D</p>
            )}
          </div>


          <div className="todo-section completed">
            <h2>Completed</h2>
            {completedTasks.length > 0 ? (
              <ul>
                {completedTasks.map((todo, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todos.indexOf(todo))}
                    />
                    <span>{todo.text}</span>
                    <button
                      className="btn-delete"
                      onClick={() => deleteTodo(todos.indexOf(todo))}
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-text">No completed tasks yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;