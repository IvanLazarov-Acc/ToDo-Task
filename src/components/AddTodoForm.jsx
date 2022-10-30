import React, {useState} from "react";
import {Stack, TextField} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers';


const AddTodoForm = () =>{


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueIn, setDueIn] = useState(null);
    const newTodo = {name:"",description:"",dueIn:new Date(), isDone:false}

    const url = " https://auto.loanvantage360.com/fps/api/todo";

    const addTodo = async(newTodo) => {
      const requestOptions = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Basic ${process.env.REACT_APP_AUTH_TOKEN}`
          },
        //   body:JSON.stringify(newTodo),
        body:newTodo,
      };
      const response = await fetch(url, requestOptions);
      if(response.ok){
        alert("New todo added successfully");
      }else{
        alert("The new todo could not be processed, try again later!");
      }
      
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        newTodo.name = name
        newTodo.description = description
        newTodo.dueIn = dueIn;
        addTodo(newTodo);  
        // console.log(JSON.stringify(newTodo))
    }

    const handleNameChange = event => {
        setName(event.target.value);
    };
    const handleDescriptionChange = event => {
        setDescription(event.target.value);
    };
    


    

    return(<div className="form-container">
        <form className="todo-form" action="post" onSubmit={handleSubmit}>
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

            <Stack spacing={4} sx={{width:"250px"}}>
                <DateTimePicker lable="Select Due Date"
                                renderInput={(params)=> <TextField {...params} required/>}
                                value={dueIn} 
                                disablePast={true}
                                onChange={(newValue) => setDueIn(newValue)}/>
            </Stack>
            

            <input type="submit" className="button" id="new-todo-button" value="Add Todo"/>
        </form>
    </div>);
}

export default AddTodoForm;