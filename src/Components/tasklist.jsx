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
        if(props.list[i].Status) {
        output.push(
            <div
                id = 'list'
            >
                <div id = 'task'>
                {props.list[i].Task}
                </div>
                <div id = 'task'
                 onClick={e => toggleDoneFE(i,props.list,props.setTaskList)}
                >
                Good Job!
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
    else {output.push(
        <div
            id = 'list'
        >
            <div id = 'task'>
            {props.list[i].Task}
            </div>
            <div id = 'task'
             onClick={e => toggleDoneFE(i,props.list,props.setTaskList)}
            >
            Keep Going!
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
}
    return output
}


//function Junction

function toggleDoneFE(i,list, setTaskList) {
        toggleDoneDB(list[i].id);
        list[i].Status = !list[i].Status
        setTaskList(tasks => [...tasks])
}

async function toggleDoneDB(id) {
    const uri = "http://localhost:4000/graphql"
    await fetch(uri,
        {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
            query: query.toggleDone
            }).replace("$id",id)
        })
    // await toggle.json()
}
