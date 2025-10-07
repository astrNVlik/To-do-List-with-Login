import React, { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all"); 

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


  const filteredTodos = todos.filter((todo) => {
    if (filter === "ongoing") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

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
          }
        >
          Easter egg
        </button>

        <button
          className="link-github"
          onClick={() =>
            (window.location.href = "https://github.com/astrNVlik/To-do-List-with-Login/tree/main/src/compoments")
          }
        >
          Github Page
        </button>
        
      </div>

 
      <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>
     

      <div className="todo-card">
        <h1>To-Do List</h1>


        <div className="filter-buttons">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "ongoing" ? "active" : ""}
            onClick={() => setFilter("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>


        <div className="todo-section">
          {filteredTodos.length > 0 ? (
            <ul>
              {filteredTodos.map((todo, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index)}
                  />
                  <span className={todo.completed ? "completed-text" : ""}>
                    {todo.text}
                  </span>
                  {todo.completed && (
                    <button
                      className="btn-delete"
                      onClick={() => deleteTodo(index)}
                    >
                      delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">No tasks found for this filter</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
