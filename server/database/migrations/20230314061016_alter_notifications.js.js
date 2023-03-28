
exports.up = function(knex) {

    return knex.schema.alterTable('notifications', (table) => {
        table.integer('user_id');
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable('notifications');
};
