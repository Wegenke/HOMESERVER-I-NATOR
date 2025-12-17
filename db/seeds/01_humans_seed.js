/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('humans').insert([
    { type: 'parent', name:'Matt Wegenke', nick_name:'Pops',rating:10, do_list:[], done_list:[], allowance_earned:0.00},
    { type: 'parent', name:'Ashley Wegenke',nick_name:'Mamma', rating:10, do_list:[], done_list:[], allowance_earned:0.00},
    { type: 'kid', name:'Matthew Wegenke', nick_name:'Tuna',rating:10, do_list:[], done_list:[], allowance_earned:0.00},
    { type: 'kid', name:'Domanic Wegenke', nick_name:'Boe Joe',rating:10, do_list:[], done_list:[], allowance_earned:0.00},
    { type: 'kid', name:'Any Body', nick_name:'Any Body',rating:10, do_list:[], done_list:[], allowance_earned:0.00}
  ]);
};
