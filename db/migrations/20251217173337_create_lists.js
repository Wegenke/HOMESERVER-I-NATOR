/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('lists', table => {
        table.increments();
        table.string("name");
        table.string("description");
        table.integer("list_status_type_id").unsigned().references("id").inTable("master_type_enum_items").onDelete("SET NULL");
        table.integer("list_type_id").unsigned().references("id").inTable("master_type_enum_items").onDelete("SET NULL");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    }).then(() => {
        return knex.schema.createTable('list_items', table => {
            table.increments();
            table.integer("list_id").unsigned().references("id").inTable("lists").onDelete("CASCADE");
            table.string("item_name");
            table.string("item_description");
            table.integer("status").unsigned().references("id").inTable("master_type_enum_items").onDelete("SET NULL");
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.timestamp("updated_at").defaultTo(knex.fn.now());
        });
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('list_items')
        .then(() => knex.schema.dropTableIfExists('lists'));
};
