module.exports = knex => {
  return async params => {
    let output = await knex("todo").select();
    return output;
  };
};
