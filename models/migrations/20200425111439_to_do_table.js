exports.up = function(knex, Promise) {
  return knex.schema.createTable("todo", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.timestamp("start_date")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time

    t.timestamp("due_date")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time

    t.boolean("finished")
      .notNullable()
      .defaultTo(false);

    t.string("Desc", 40) // maximum length of 15 characters
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("todo");
};
