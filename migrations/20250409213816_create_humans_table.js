/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('humans', table => {
    table.increments();
    table.string('type');
    table.string('name');
    table.string('nick_name');
    table.integer('rating');
    table.string('do_list');
    table.string('done_list');
    table.float('allowance_earned', 4,2);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('humans');
};
