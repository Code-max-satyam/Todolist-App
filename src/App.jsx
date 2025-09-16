import React, { useEffect, useState } from 'react'
import { CiLight, CiDark, CiSearch } from "react-icons/ci";
import TodoForm from './Components/TodoForm';
import TodoList from './Components/TodoList';

const App = () => {

  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) =>
      (todo?.text || "").toLowerCase().includes(search.toLowerCase())
    );

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-sky-100 dark:bg-sky-950 max-sm:text-sm max-sm:p-3'>

      <div className='bg-primary dark:bg-primary-dark rounded-2xl shadow-lg w-full max-w-xl p-3 sm:p-6 max-h-[80vh] overflow-y-auto'>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-dark dark:text-primary">
            Todo List
          </h1>

          <button onClick={() => toggleMode()} className='px-3 py-2 rounded-lg dark:bg-primary text-white bg-primary-dark dark:text-primary-dark hover:opacity-80 transition flex items-center justify-center cursor-pointer'>
            {darkMode ? <CiLight size={22} /> : <CiDark size={22} />}
          </button>
        </div>    

        <div className="flex w-full justify-between items-center gap-3 mb-6 ">
          <div className='flex items-center gap-2 bg-primary-dark/15 dark:bg-primary/75 text-primary-dark/90 dark:text-primary-dark rounded-lg w-[70%] px-3 py-2' >
            <CiSearch size={20} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-[65px] sm:w-1/5 max-sm:text-xs px-1 sm:px-2 py-1.5 rounded-lg bg-primary-dark/15 dark:bg-gray-600 text-gray-900 dark:text-white focus:outline-none cursor-pointer"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Done</option>
          </select>
        </div>

        <TodoForm addTodo={addTodo} />

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />

      </div>

    </div>
  )
}

export default App
