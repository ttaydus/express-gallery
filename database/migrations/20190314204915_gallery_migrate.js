exports.up = function(knex, Promise) {
  return knex.schema.createTable("artwork", table => {
    table.increments();
    table.string("author").notNullable();
    table.string("url").notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("artwork");
};
