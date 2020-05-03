const queryTasks = `query {
    tasklist{
      id
      start_date
      due_date
      finished
      desc  
    }
  }`
  
const toggleDone = `mutation {
    toggleDone (id:$id) {
        id
        finished
        }
    }`


  export default {queryTasks, toggleDone}