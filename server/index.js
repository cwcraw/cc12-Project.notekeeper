const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const config = require("../config");
const knex = require("knex")(config.db);
const todo = require("../models/todo")(knex);
const cors = require('cors');

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
  tasklist: async () => {
    let output = await todo.list();
    return output;
  },

  //create
  createTask: async request => {
    console.log(request)
    let newTask = {};
    // newTask.id = request.id
    newTask.start_date = new Date().toDateString();
    // newTask.start_date = newTask.start_date.toDateString()
    newTask.due_date = new Date().toDateString();
    newTask.finished = false;
    newTask.desc = request.desc;
    // data.tasks.push(newTask);
    let outputId = await todo.createTask(newTask);
    console.log(outputId);
    newTask.id = outputId[0];
    return newTask;
  },

  // update
  toggleDone: async request => {
    let updatedTask;
    let list = await todo.list();
    await list.map(async task => {
      if (task.id === parseInt(request.id)) {
        updatedTask = task;
      }
    });
    updatedTask = await todo.toggleDone(updatedTask);
    return updatedTask;
  },

  updateDueDate: async request => {
    let date;
    let fromNow = request.fromNow;
    let updatedTask;
    let list = await todo.list();
    list.map(task => {
      if (task.id === parseInt(request.id)) {
        updatedTask = task;
      }
    });
    updatedTask = await todo.updateDueDate(fromNow, updatedTask);
    return updatedTask;
  },
  // Delette
  clearDoneTasks: async request => {
    let list = await todo.list();
    listFinished = list.filter(task => task.finished === true);
    let output = await todo.clearDoneTasks(listFinished);
    return listFinished;
  },

  clearOneTask: async request => {
    let list = await todo.list();
    list = list.filter(task => task.id !== parseInt(request.id));
    await todo.clearOneTask(request.id);
    return list;
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
app.use(cors())
app.use(express.static('/server '));
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

module.exports = root;
