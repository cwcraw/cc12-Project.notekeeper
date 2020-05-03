const queryTasks = `{
      tasklist{
        id
        start_date
        due_date
        finished
        desc  
      }
    }`  

const addTasks =  `mutation {
    createTask (desc: "Make on MVP"){
    desc
    }
  }`  

const uri = "http://localhost:4000/graphql"
const fetchTasks = fetch(uri,
{
    method: 'POST',
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      query: queryTasks
    })
})

const fetchAddTask = fetch(uri,
  {
    method: 'POST',
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      query: addTasks
    })
  })

let _table_ = document.createElement('table')
let _tr_ = document.createElement('tr')
let _th_ = document.createElement('th')
let _td_ = document.createElement('td')

function buildHtmlTable (arr) {
  let table = _table_.cloneNode(false)
  let columns = addAllColumnHeaders(arr, table);
  for (let i=0, maxi=arr.length; i < maxi; ++i) {
    let tr = _tr_.cloneNode(false);
    for (let j=0, maxj=columns.length; j < maxj ; ++j) {
      let td = _td_.cloneNode(false);
      let cellValue = arr[i][columns[j]];
      td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
function addAllColumnHeaders (arr, table) {
  let columnSet = []
  let tr = _tr_.cloneNode(false);
  for (var i=0, l=arr.length; i < l; i++) {
    for (var key in arr[i]) {
      if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
        columnSet.push(key);
        var th = _th_.cloneNode(false);
        th.appendChild(document.createTextNode(key));
        tr.appendChild(th);
      }
    }
  }
  table.appendChild(tr);
  return columnSet;
}

let taskPrettifier = (task) => {
  let output = {}
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

document.addEventListener("DOMContentLoaded", async () => {

// Task list elements
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  taskList.innerHTML = "Task list"
  let tasks = await fetchTasks
  tasks = await tasks.json()
  let prettyList = tasks.data.tasklist.map(el => taskPrettifier(el))
  taskList.append(buildHtmlTable(
    prettyList))
  document.body.appendChild(taskList)
// Ne Task Element
  const newTask = document.createElement("div")
  newTask.id = newTask
  let taskEl = document.createElement("p")
  taskEl.innerHTML = "I need to:"
  newTask.appendChild(taskEl)
  const newTaskText = document.createElement('input')
  newTaskText.id = 'newTaskText'
  newTask.appendChild(newTaskText)
  let delayEl = document.createElement("p")
  delayEl.innerHTML = "to be done in this many days:"
  newTask.appendChild(delayEl)
  const newTaskDelay = document.createElement('input')
  newTaskDelay.id = 'newTaskDelay'
  newTask.appendChild(newTaskDelay)

  const newTaskButton = document.createElement("button")
  newTaskButton.append("What am I doing?")
  newTaskButton.id=('newTaskButton')
  newTask.appendChild(newTaskButton)
  document.body.appendChild(newTask)

  //New Task Button click
  newTaskButton.addEventListener('click', () => {
    fetchAddTask
  })


});

