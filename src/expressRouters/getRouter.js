const express = require('express');
const router = express.Router();
const ENV = process.env.ENV 
const knex = require('knex')(require('../../knexfile.js')[ENV])
require('dotenv').config()

//Knex Handler Functions
const  getMaxId = async(table) => {
  const maxID = await knex(table).max('id').first()
  return maxID.max
}

// Base Gets
router.get('/chores', (req,res) =>{
  knex('chores').select('*').then(chores => res.json(chores))
})

router.get('/plants', (req,res) =>{
  knex('plants').select('*').then(plants => res.json(plants))
})

router.get('/animals', (req,res) =>{
  knex('animals').select('*').then(animals => res.json(animals))
})

router.get('/humans', (req,res) =>{
  knex('humans').select('*').then(humans => res.json(humans))
})

router.get('/human_ids', (req, res) =>{
  knex('humans').select('id','name','nick_name').then(x => res.json(x))
})

router.get('/chore/:id', (req,res) =>{
  const {id} = req.params
  getMaxId('chores')
    .then(data => {
      if(data < id){
        res.send('ID out of range!')
      }else{
        knex('chores').select('*').where('id', '=', id).then(chores => {
          return res.json(chores)
        })
      }
    })
})

module.exports = router;