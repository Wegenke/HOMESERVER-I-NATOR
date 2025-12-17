/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('chores', table => {
    table.increments();
    table.timestamp('created_at', { precision: 2 }).defaultTo(knex.fn.now(2));
    table.string('chore_name');
    table.string('chore_value');
    table.boolean('completed');
    table.integer('completed_by').defaultTo(0);
    table.timestamp('completed_at');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('chores')
};
