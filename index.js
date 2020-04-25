const query = `{
      tasklist{
        id
        start_date
        due_date
        finished
        desc
        
      }
    }`

const uri = "/graphql"
document.addEventListener("DOMContentLoaded", async () => {
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  console.log(uri)
  let tasks = await fetch("http://localhost:4000/graphql",
    {
      method: 'POST',
      headers: {"Content-Type" : "application/json"},
      // mode: 'no-cors',
      body: JSON.stringify({
        query: `
      query { 
        tasklist {
        id
        desc
        }
      }
      `
      })
    })
  tasks = await tasks.json()
  console.log(tasks.data.tasklist)
  taskList.innerHTML = tasks.data.tasklist[0].desc
  document.body.append(taskList);

});

