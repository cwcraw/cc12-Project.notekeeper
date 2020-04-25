//const todo = require("./createTask.js");

module.exports = knex => {
  return {
    createTask: require("./createTask")(knex),
    list: require("./list.js")(knex),
    toggleDone: require("./toggleDone")(knex)
  };
};
