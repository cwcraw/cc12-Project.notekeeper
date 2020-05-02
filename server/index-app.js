const { ApolloServer, gql } = require('apollo-server');
const config = require("../config");
const knex = require("knex")(config.db);
const todo = require("../models/todo")(knex);

const typeDefs = gql`
type Query {
  tasklist: [task]
}

type Mutation {
  createTask(desc: String): task
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
`;

const resolvers = {
  //read
  Query: {
    tasklist: async () => {
      let output = await todo.list();
      return output;
    }
  },

  //create
  Mutation: {
    createTask: async (request) => {
      console.log(request)
      let newTask = {};
      newTask.start_date = new Date().toDateString();
      newTask.due_date = new Date().toDateString();
      newTask.finished = false;
      newTask.desc = request.desc
      let outputId = await todo.createTask(newTask);
      newTask.id = outputId[0];
      console.log(newTask)
      return newTask;
    },

    // update
    toggleDone: async request => {
      let updatedTask;
      let list = await todo.list();
      console.log(list)
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
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
});