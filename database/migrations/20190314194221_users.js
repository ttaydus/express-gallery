exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("colName");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
