import './App.css';
import React,{useEffect, useState} from "react";
import List from "./components/List";
import AddTodoForm from './components/AddTodoForm';
import {TodoListContext} from "../src/Contexts/TodoListContext";
function App() {
  const [todos, setTodos] = useState([]);

  const url = " https://auto.loanvantage360.com/fps/api/todo";

  const getTodos = async() => {
    const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
        },  
    };
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    setTodos(data.data);
}

  useEffect(()=> {
    getTodos();
  }, []);

  return (
    <div className="App">
      <TodoListContext.Provider value={{todos, setTodos}}>
        <AddTodoForm/>
        <List/>
      </TodoListContext.Provider>
    </div>
  );
}

export default App;
