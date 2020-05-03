import React from "react";
import "../Styles/tasklist.css"
import query from "../query.js"


export default function TaskList(props) {
    let output = [ <div id = 'list'>
        <div id = 'task'>
            Task Title
        </div>
        <div id = 'task'>
            Status
        </div>
        <div id = 'task'>
            Start Date
        </div>
        <div id = 'task'>
            Due Date
        </div>
    </div>]
    for(let i = 0; i < props.list.length; i++){
        console.log(props.list[i])
        output.push(
            <div
                id = 'list'
            >
                <div id = 'task'>
                {props.list[i].Task}
                </div>
                <div id = 'task'
                 onClick={e => {
                    console.log(props.list[i].id);
                    toggleDone(props.list[i].id);
                    console.log(e)
                }}
                >
                {props.list[i].Status}
                </div>
                <div id = 'task'>
                {props.list[i].Start}
                </div>
                <div id = 'task'>
                {props.list[i].Due}

                </div>

            </div>
        )
    }
    return output
}


//function Junction

async function toggleDone(id) {
    const uri = "http://localhost:4000/graphql"
    console.log(id)
    let toggle = await fetch(uri,
        {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
            query: query.toggleDone
            }).replace("$id",id)
        })
    toggle = await toggle.json()
    console.log(toggle)
}