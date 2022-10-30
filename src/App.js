import './App.css';
import React,{useEffect, useState} from "react";
import List from "./components/List";
import AddTodoForm from './components/AddTodoForm';
import {TodoListContext} from "../src/Contexts/TodoListContext";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);




  const url = "https://auto.loanvantage360.com/fps/api/todo";

  const getTodos = async() => {
    const requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
        },  
    };
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setTodos(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(()=> {
    getTodos();
  }, []);

  if(isLoading) {
    return <h2>...Loading</h2> 
  } else{
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="App">
          <TodoListContext.Provider value={{todos, setTodos}}>
            <AddTodoForm/>
            <List/>
          </TodoListContext.Provider>
        </div>
      </LocalizationProvider>
      
    );
  }

  
}

export default App;
