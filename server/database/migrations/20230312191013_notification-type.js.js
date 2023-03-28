
exports.up = function(knex) {
    return knex.schema.createTable('notifications', (table) => {
        table.increments("id").primary();
        table.string('subject');
        table.string('title');
        table.string('content');

    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('notifications');
};
