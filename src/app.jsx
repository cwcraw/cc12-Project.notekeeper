import React, { useState, useEffect } from "react";
import TitleBar from "./Components/titleBar.jsx"
import TaskList from "./Components/tasklist.jsx"
import query from "./query.js"

//Need to get data from the database

export default function App() { 
    const [taskList, setTaskList]=useState('empty')

  

    useEffect(() => {getList()},[])

    return (
        <div className = "App">
            <TitleBar />
            <TaskList 
            list = {taskList}
            />
        </div>
    )

// FUNCTION JUNCTION 

function taskPrettifier(task) {
    let output = {}
    output.id=task.id
    output.Start = new Date(parseInt(task.start_date)).toDateString()
    output.Due = new Date(parseInt(task.due_date)).toDateString()
    if(task.finished){
      output.Status = 'Great Job!'
    } else {
      output.Status = 'You can do it!'
    }
    output.Task = task.desc
    return output
  }

async function getList() {
    const uri = "http://localhost:4000/graphql"
    let fetchTasks = await fetch(uri,
        {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
            query: query.queryTasks
            })
        })
    fetchTasks = await fetchTasks.json()
    fetchTasks = fetchTasks.data.tasklist
    let prettyTasks = []
    for(let el of fetchTasks) {
        prettyTasks.push( taskPrettifier(el))
    }
    prettyTasks.sort((a,b) => {
        if (a.id > b.id) return 1
        if (a.id < b.id) return -1
        return 0
    } )
    console.log(prettyTasks)
    setTaskList(prettyTasks)

    }
}
