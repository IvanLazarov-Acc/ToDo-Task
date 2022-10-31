import React, {useState, useContext, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import EditModal from "./EditModal";
import { TodoListContext } from "../Contexts/TodoListContext";


const Todo = ({todoId,name, description, dueDate, isDone}) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const {todos,setTodos, getTodos} = useContext(TodoListContext);
    const [singleTodo, setSingleTodo] = useState({});

    let progress = "";
    let dueDateChanged = new Date(dueDate);
    let currentDate = new Date();
    let expiryDate = new Date(new Date().setHours(currentDate.getHours() + 12));
    let background_color = "green";
    let isButton = true;
    let buttonOpacity = 1.0;
    const url = `https://auto.loanvantage360.com/fps/api/todo/${todoId}`;

    useEffect(()=>{
        getTodo();
    },[])

    const deleteTodo = async() => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
            },
        };
        try {
            const response = await fetch(url, requestOptions);
            if(response.ok){
                setTodos(
                    todos.filter((todo) => {
                       return todo.id !== todoId;
                    })
                 );
                alert(`Todo with ID ${todoId} deleted successfully`);
            }else{
                alert("The deletion of the todo could not be processed, try again later!");
            }
        } catch (error) {
            console.log(error);
        }
        
        
    }

    const getTodo = async () => {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
                },});
            const data =  await response.json();
            setSingleTodo(data.data);
        } catch (error) {
            console.log(error);
        }  
    }

    const completeTodo = async() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
            },
            body: JSON.stringify({...singleTodo,isDone:true})
        };
        try {
            const response = await fetch(url, requestOptions);
            if(response.ok){
              alert(`Todo with ID ${todoId} completed successfully`);
            }else{
              alert("The completion of the todo could not be processed, try again later!");
            }
        } catch (error) {
            console.log(error); 
        } finally{
            getTodos();
        }
        
    }

    const handleComplete = () => {
        getTodo();
        completeTodo();
    }


    if(dueDateChanged >= currentDate && isDone===true){
        progress = "Finished";
        background_color="green";
        isButton=true;
        buttonOpacity=0.7;
    }
    else if(dueDateChanged < currentDate && isDone===false){
    
        progress = "Failed";
        background_color="red"
        isButton=true;
        buttonOpacity=0.7;
    
    }
    else if(dueDateChanged >= currentDate && isDone===false){
        if(dueDateChanged > expiryDate){
            progress = "More than 12 hours left"
            background_color="blue"
            isButton=false;
            buttonOpacity=1.2;
        }else{
            progress = "Less than 12 hours left"
            background_color="orange"
            isButton=false;
            buttonOpacity=1.2;
        }
    }
    else if(dueDateChanged < currentDate && isDone===true){
      progress = "Finished";
      background_color="green";
      isButton=true;
      buttonOpacity=0.7;
    }

    


    return(<div className="todo">
        <li className="todo-item">
            <h3 className="name">{name}</h3>
            <p className="description">{description}</p>
            <div className="due-container">
                <p>Finish until:</p>
                <h5>{dueDate}</h5>
            </div>

            <ProgressBar progress={progress} background_color={background_color}/>
            <div className="buttons-container">
                <button className="button" id="comlete" disabled={isButton} style={{"opacity":buttonOpacity}} onClick={handleComplete}>Complete</button>
                <button className="button" id="edit" disabled={isButton} style={{"opacity":buttonOpacity}} onClick={()=> setOpenEditModal(!openEditModal)}>Edit</button>
                <button className="button" id="delete"disabled={isButton} style={{"opacity":buttonOpacity}} onClick={deleteTodo}>Delete</button>
            </div>
            <EditModal openEditModal={openEditModal} todoId={todoId}/>
        </li>

    </div>);
}

export default Todo;