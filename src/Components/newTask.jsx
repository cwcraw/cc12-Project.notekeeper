import React from "react";
import "../Styles/tasklist.css"
import query from "../query.js"

export default function NewTask(props) {

    return (
        <div>
            <label htmlFor="taskDesc">Enter your new task:</label>
            <input id = 'taskDesc' type = 'text' />
            <label htmlFor="taskDueDate">Enter the due date:</label>
            <input id = 'taskDueDate' type = 'date' />
            <input type = 'submit' id='submitButton'
            onClick={e => {console.log(e)}}>
            </input>
        </div>
    )
}