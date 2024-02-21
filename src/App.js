import './App.css';
import Form from './components/Form';
import { useEffect, useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const getLocalTodos = () => {
      if (localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]))
        setTodos([])
      } else {
        setTodos(JSON.parse(localStorage.getItem("todos")))
      }
    }
    getLocalTodos();
    console.log("effect1")
  }, []);

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.completed === true));
          break;
        case "uncompleted":
          setFilteredTodos(todos.filter((todo) => todo.completed === false));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }

    const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    filterHandler();
    setTimeout(() => {
      saveLocalTodos();
    }, 0);
    console.log("effect2")
  }, [todos, status]);

  return (
    <div className="App">
      <header>
        <h1>TODO List</h1>
      </header>
      <Form 
        inputText={inputText}
        setInputText={setInputText}
        todos={todos}
        setTodos={setTodos}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
