module.exports = knex => {
  return async (params, task) => {
    let output;
    console.log(params, task);
    date = new Date(task.due_date);
    task.due_date = new Date(date.setUTCDate(date.getUTCDate() + params));
    // task.due_date = task.due_date.toDateString()
    console.log(task);
    output = await knex("todo")
      .where("id", task.id)
      .update({ due_date: task.due_date })
      .select("due_date");
    return task;
  };
};
