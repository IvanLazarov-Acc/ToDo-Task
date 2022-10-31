import React, {useState} from "react";



const AddTodoForm = ({getTodos}) =>{


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueIn, setDueIn] = useState("");
    const newTodo = {name:"",description:"",dueIn:null}

    const url = " https://auto.loanvantage360.com/fps/api/todo";

    const addTodo = async() => {
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
          },
          body:JSON.stringify(newTodo),
      };
      try{
        const response = await fetch(url, requestOptions);
        if(response.ok){
          alert("New todo added successfully");
        }else{
          alert("The new todo could not be processed, try again later!");
        }
      } catch(error){
        console.log(error);
      } finally{
        getTodos();
      }
      
      
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        newTodo.name = name
        newTodo.description = description
        newTodo.dueIn = dueIn;
        addTodo();  
        // console.log(JSON.stringify(newTodo))
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
            
            

            <input type="submit" className="button" id="new-todo-button" value="Add Todo"/>
        </form>
    </div>);
}

export default AddTodoForm;