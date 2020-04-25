module.exports = knex => {
  return async params => {
    params.finished = !params.finished;
    await knex("todo")
      .where("id", params.id)
      .update({ finished: params.finished })
      .select();
    return params;
  };
};
