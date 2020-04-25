module.exports = knex => {
  return async params => {
    console.log(params);
    const start_date = params.start_date;
    const due_date = params.due_date;
    const finished = params.finished;
    const desc = params.desc;

    let outputId = await knex("todo")
      .insert(params)
      .returning("id");

    return outputId;
  };
};
