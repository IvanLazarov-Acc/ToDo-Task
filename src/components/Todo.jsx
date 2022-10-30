import React, {useState} from "react";
import ProgressBar from "./ProgressBar";
import EditModal from "./EditModal";


const Todo = ({todoId,name, description, dueDate, isDone}) => {
    const [openEditModal, setOpenEditModal] = useState(false);

    let progress = "";
    let dueDateChanged = new Date(dueDate);
    let currentDate = new Date();
    let expiryDate = new Date(new Date().setHours(new Date().getHours() + 12));
    let background_color = "green";
    let isButton = true;
    let buttonOpacity = 1.0;
    const url = `https://auto.loanvantage360.com/fps/api/todo/${todoId}`;

    const deleteTodo = async() => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
            },
            body: JSON.stringify({isDone:true})
        };
        const response = await fetch(url, requestOptions);
        if(response.ok){
          alert(`Todo with ID ${todoId} deleted successfully`);
        }else{
          alert("The deletion of the todo could not be processed, try again later!");
        }
        
    }

    const completeTodo = async() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
            },

        };
        const response = await fetch(url, requestOptions);
        if(response.ok){
          alert(`Todo with ID ${todoId} completed successfully`);
        }else{
          alert("The completion of the todo could not be processed, try again later!");
        }
        
    }

    // console.log(dueDate);
    // console.log(expiryDate);
    // console.log(currentDate);
    // console.log(dueDateChanged);
    // console.log(dueDateChanged < currentDate);

    if(dueDateChanged >= currentDate && isDone===true){
        progress = "Finished";
        background_color="green";
        isButton=true;
        buttonOpacity=0.7;
    }else if(dueDateChanged >= currentDate && isDone===false){
        if(expiryDate <= dueDateChanged){
            progress = "Less than 12 hours left"
            background_color="orange"
        }
        else if(expiryDate > dueDateChanged){
            progress = "More than 12 hours left"
            background_color="blue"
        }
    }
    else if(dueDateChanged < currentDate && isDone===true){
      progress = "Finished";
      background_color="green";
      isButton=true;
      buttonOpacity=0.7;
    }else if(dueDateChanged < currentDate && isDone===false){
        progress = "Failed";
        background_color="red"
        isButton=true;
        buttonOpacity=0.7;
    }
    
    isButton = false;
    buttonOpacity = 1;

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
                <button className="button" id="comlete" disabled={isButton} style={{"opacity":buttonOpacity}} onClick={completeTodo}>Complete</button>
                <button className="button" id="edit" disabled={isButton} style={{"opacity":buttonOpacity}} onClick={()=> setOpenEditModal(!openEditModal)}>Edit</button>
                <button className="button" id="delete"disabled={isButton} style={{"opacity":buttonOpacity}} onClick={deleteTodo}>Delete</button>
            </div>
            <EditModal openEditModal={openEditModal} todoId={todoId}/>
        </li>

    </div>);
}

export default Todo;