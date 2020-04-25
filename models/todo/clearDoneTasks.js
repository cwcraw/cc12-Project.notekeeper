module.exports = knex => {
  return async params => {
    console.log(params);
    for (let task of params) {
      await knex("todo")
        .where("id", task.id)
        .del();
    }
  };
};
