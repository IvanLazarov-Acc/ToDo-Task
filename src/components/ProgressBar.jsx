
import React from "react";
const ProgressBar = ({progress, background_color}) => {
    return (
    <div className="progress-container">
        <p>Status:</p>
        <div>{progress}</div>
        <div className="progress-bar" style={{"backgroundColor":background_color}}></div>
    </div>
        );
}

export default ProgressBar;