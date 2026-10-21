import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadTodos = async () => {
      try {
        const res = await fetch('/api/todos');
        const data = await res.json();
        if (!ignore) {
          setTodos(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to fetch todos:', err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadTodos();

    return () => {
      ignore = true;
    };
  }, []);

  // Add a new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: text.trim() }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setText('');
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  // Toggle todo completed status
  const handleToggle = async (todo) => {
    try {
      const safeId = encodeURIComponent(todo.id);
      const res = await fetch(`/api/todos/${safeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const updated = await res.json();
      setTodos((prevTodos) => prevTodos.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      const safeId = encodeURIComponent(id);
      await fetch(`/api/todos/${safeId}`, { method: 'DELETE' });
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1>Todo App</h1>
        <p className="subtitle">PostgreSQL + Express MVC + React</p>

        {/* Input Form */}
        <form onSubmit={handleAddTodo} className="todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="todo-input"
          />
          <button type="submit" className="todo-add-btn">
            Add
          </button>
        </form>

        {/* Todo List */}
        {loading ? (
          <p className="todo-empty">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="todo-empty">No tasks yet. Add one above!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                    className="todo-checkbox"
                  />
                  <span className="todo-title">{todo.title}</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleDelete(todo.id)}
                  className="todo-delete-btn"
                  title="Delete task"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        {todos.length > 0 && (
          <div className="todo-footer">
            <span>{todos.filter((t) => !t.completed).length} items remaining</span>
          </div>
        )}
      </div>
    </div>
  );
}
