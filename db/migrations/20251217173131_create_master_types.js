/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('master_type_enums', table => {
        table.increments('id').primary();
        table.string('type_name').notNullable();
        table.string('description');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(() => {
        return knex.schema.createTable('master_type_enum_items', table => {
            table.increments('id').primary();
            table.integer('enum_id').unsigned().references('id').inTable('master_type_enums').onDelete('CASCADE');
            table.string('item_name').notNullable();
            table.string('item_display_text');
            table.string('item_additional_info');
            table.integer('item_value').unsigned();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('master_type_enum_items')
        .then(() => knex.schema.dropTableIfExists('master_type_enums'));
};
