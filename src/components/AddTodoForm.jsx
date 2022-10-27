import React, {useState} from "react";


const AddTodoForm = () =>{
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueIn, setDueIn] = useState("");

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
        <form className="todo-form" action="post">
            <input
                maxLength={100}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
            />
            <textarea
                maxLength={500}
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <input
                maxLength={100}
                type="text"
                id="due"
                name="due"
                value={dueIn}
                onChange={handleDueInChange}
            />
        </form>
    </div>);
}

export default AddTodoForm;