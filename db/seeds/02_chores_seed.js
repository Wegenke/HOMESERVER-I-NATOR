/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  await knex('chores').del()
  await knex('chores').insert([
    {chore_name:'dishes',chore_value:3,completed:false},
    {chore_name:'make bed',chore_value:1,completed:false},
    {chore_name:'morning teeth',chore_value:1,completed:false},
    {chore_name:'dog doo',chore_value:7,completed:false}
  ]);
};
