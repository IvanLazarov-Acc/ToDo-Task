import React, {useContext} from "react";
import { TodoListContext } from "../Contexts/TodoListContext";
import Todo from "./Todo";

const List = () => {
    const {todos} = useContext(TodoListContext);
    console.log(todos)

    return(
        <div className="todo-container">
            <ul className="todo-list">
                {
                todos.map((todo) =>(<Todo key={todo.id} name={todo.name} description={todo.description} dueDate={todo.dueDate} isDone={todo.isDone}/> )    
                )}
            </ul>
        </div>
    );
}

export default List;