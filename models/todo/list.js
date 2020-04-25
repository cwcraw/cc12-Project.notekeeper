module.exports = knex => {
  return async params => {
    let output = await knex("todo").select();
    console.log(output);
    return output;
  };
};
