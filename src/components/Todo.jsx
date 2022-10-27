import React, {useState} from "react";

const Todo = ({name, description, dueDate, isDone}) => {

    const [date, setDate] = useState(new Date());
    // const [progress, setProgress] = useState("");
    let progress = "";
    let dueDateChanged = new Date(dueDate);
    // console.log(dueDate);
    // console.log(isDone);
    // console.log(date);
    // console.log(dueDateChanged);
    // console.log(dueDateChanged > date);

    
    if(dueDateChanged >= date && isDone===true){
        // setProgress("Finished");
        progress = "Finished";
    }else if(dueDateChanged >= date && isDone===false){
        progress = "Failed";
        // setProgress("Failed");
    }else if(dueDateChanged < date && isDone===true){
        // if(){
  
        // }
    }else if(dueDateChanged < date && isDone===false){
  
    }
    console.log(progress);
    return(<div className="todo">
        <li className="todo-item">
            <h3>{name}</h3>
            <p>{description}</p>
            <h5>{dueDate}</h5>
            <p>{progress}</p>
        </li>

    </div>);
}

export default Todo;