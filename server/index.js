const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const config = require("../config");
const knex = require("knex")(config.db);
// mock data [Structure like in Pokemon]
const data = require("./data");
const todo = require("../models/todo")(knex);

const schema = buildSchema(`
  type Query {
    tasklist: [task]
  }

  type Mutation {
    createTask(id:ID,start_date: String,due_date: String,finished: Boolean, desc: String): task
    toggleDone(id: ID): task
    updateDueDate(id: ID, fromNow: Int): task
    clearDoneTasks: [task]
    clearOneTask(id: ID): [task]
  }

  type task {
    id: ID!
    start_date: String
    due_date: String
    finished: Boolean
    desc: String
  }
`);

// The root provides the resolver functions for each type of query or mutation.
const root = {
  //read
  tasklist: () => {
    return data.tasks;
  },

  //create
  createTask: async request => {
    let newTask = {};
    // newTask.id = request.id
    newTask.start_date = new Date().toDateString();
    newTask.due_date = new Date().toDateString();
    newTask.finished = false;
    newTask.desc = request.desc;
    data.tasks.push(newTask);
    let outputId = await todo.createTask(newTask);
    console.log(outputId);
    newTask.id = outputId[0];
    return newTask;
  },
  // update
  toggleDone: request => {
    let updatedTask;
    data.tasks.map(task => {
      if (task.id === parseInt(request.id)) {
        task.finished = !task.finished;
        updatedTask = task;
      }
    });
    return updatedTask;
  },

  updateDueDate: request => {
    let date;
    let fromNow = request.fromNow;
    let updatedTask;
    data.tasks.map(task => {
      if (task.id === parseInt(request.id)) {
        date = new Date(task.due_date);
        task.due_date = new Date(
          date.setDate(date.getDate() + fromNow)
        ).toDateString();
        updatedTask = task;
      }
    });
    return updatedTask;
  },
  // Delette
  clearDoneTasks: request => {
    data.tasks = data.tasks.filter(task => task.finished === false);
    return data.tasks;
  },

  clearOneTask: request => {
    data.tasks = data.tasks.filter(task => task.id !== parseInt(request.id));
    console.log(data.tasks);
    return data.tasks;
  }
};

// Server Stuff [taken from Pokemon]
const app = express();
/*
  The only endpoint for your server is `/graphql`- if you are fetching a resource, 
  you will need to POST your query to that endpoint. Suggestion: check out Apollo-Fetch
  or Apollo-Client. Note below where the schema and resolvers are connected. Setting graphiql
  to 'true' gives you an in-browser explorer to test your queries.
*/
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`);
});
