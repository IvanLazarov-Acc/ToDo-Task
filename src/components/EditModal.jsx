
import React, {useState,useContext} from "react";
import { TodoListContext } from "../Contexts/TodoListContext";
const EditModal = ({openEditModal, todoId})=>{
    if(!openEditModal) return null;

    const {getTodos} = useContext(TodoListContext);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueIn, setDueIn] = useState("");
    const newerTodo = {id:"",name:"",description:"",dueIn:""}

    const url = `https://auto.loanvantage360.com/fps/api/todo`;

    const updateTodo = async() => {
      const requestOptions = {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
          },
          body:JSON.stringify(newerTodo),
          
      };
      try {
        const response = await fetch(url, requestOptions);
        if(response.ok){
          alert(`Todo with ID ${todoId} updated successfully`);
        }else{
          alert("The update of the todo could not be processed, try again later!");
        }
      } catch (error) {
        console.log(error);
      }finally{
        getTodos();
      }
        
    }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        newerTodo.id = todoId;
        newerTodo.name = name;
        newerTodo.description = description;
        newerTodo.dueIn = dueIn;
        updateTodo();  
    }

    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };
    const handleDueInChange = event => {
      setDueIn(event.target.value);
    };

    return(<div className="form-container">
    <form className="todo-form" action="post" onSubmit={handleSubmit}>
        <label>
            Task Name:
            <input
                maxLength={100}
                required
                type="text"
                id="name"
                name="name"
                placeholder="Add Task Name"
                value={name}
                onChange={handleNameChange}
            />
        </label>
        <label>
            Task Description:
            <textarea
                maxLength={500}
                required
                type="text"
                id="description"
                name="description"
                placeholder="Add Task Description"
                value={description}
                onChange={handleDescriptionChange}
            />
        </label>
        <label>
                Hours to complete:
                <input
                    required
                    type="number"
                    id="due"
                    name="dueIn"
                    placeholder="Add Hours"
                    value={dueIn}
                    onChange={handleDueInChange}
                />
            </label>

        <input type="submit" className="button" id="new-todo-button" value="Edit Todo"/>
    </form>
</div>);
}

export default EditModal;
