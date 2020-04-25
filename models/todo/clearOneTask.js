module.exports = knex => {
  return async id => {
    console.log("id", id);
    await knex("todo")
      .where("id", id)
      .del();
  };
};
