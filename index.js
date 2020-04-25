document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  taskList.innerHTML = console.log(taskList); //localhost:4000/graphql?query=%7B%20tasklist%7B%0A%20%20id%0A%7D%0A%7D
  document.body.append(taskList);
});
