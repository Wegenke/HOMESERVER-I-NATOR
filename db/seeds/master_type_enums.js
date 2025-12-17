/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  let listStatusEnum = "ListStatusType";
  let listTypeEnum = "ListType";

  // Deletes ALL existing entries with TRUNCATE for a clean slate
  await knex.raw('TRUNCATE TABLE master_type_enum_items RESTART IDENTITY CASCADE');
  await knex.raw('TRUNCATE TABLE master_type_enums RESTART IDENTITY CASCADE');

  // Insert ListStatusTypes and ListType enums, get their ids
  const insertedEnums = await knex('master_type_enums')
    .insert([
      { type_name: listStatusEnum, description: 'Status types for lists' },
      { type_name: listTypeEnum, description: 'Type of list that is being used' }
    ])
    .returning(['id', 'type_name']);

  // Map type_name to id
  const enumIdMap = {};
  insertedEnums.forEach(row => {
    enumIdMap[row.type_name] = row.id;
  });

  // Insert choices for ListStatusTypes and ListType
  await knex('master_type_enum_items').insert([
    { enum_id: enumIdMap[listStatusEnum], item_name: 'Active', item_display_text: 'Active', item_additional_info: 'Shows the list as Active', item_value: 1 },
    { enum_id: enumIdMap[listStatusEnum], item_name: 'Deleted', item_display_text: 'Deleted', item_additional_info: 'Will not show the list', item_value: 2 },
    { enum_id: enumIdMap[listStatusEnum], item_name: 'Archived', item_display_text: 'Archived', item_additional_info: 'Shows the list as Archived', item_value: 3 },
    { enum_id: enumIdMap[listTypeEnum], item_name: 'Normal', item_display_text: 'Normal', item_additional_info: 'This is a typical list (think Grocery list or simple ToDo List)', item_value: 1 },
    { enum_id: enumIdMap[listTypeEnum], item_name: 'Priority', item_display_text: 'Bucket', item_additional_info: 'This list is a Bucket List - it will not remove items that have been completed, but will indicate their completion dates)', item_value: 2 },
    { enum_id: enumIdMap[listTypeEnum], item_name: 'Checklist', item_display_text: 'Checklist', item_additional_info: 'This list is a Checklist - items can be checked off but remain on the list)', item_value: 3 },
  ]);
};
