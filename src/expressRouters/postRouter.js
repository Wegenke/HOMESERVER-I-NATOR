//Express
const express = require('express');
const router = express.Router();

// Knex Info
const ENV = process.env.ENV
const knex = require('knex')(require('../../knexfile.js')[ENV])

require('dotenv').config()

// Posts Routes
router.post('/add_chore', (req, res)=>{
  const {chore_name, chore_value} = req.body
  knex('chores')
    .insert({
      chore_name:chore_name.toLowerCase().replaceAll(" ","_"),
      chore_value:chore_value,
      completed:false,
      completed_by:0
    })
    .then(chores => res.status(200).send(`${chore_name} chore added!`))
    .catch(err => {res.status(404).send(err)})
})

router.post('/add_animal', (req, res)=>{
  const {name, type, age} = req.body
  knex('animals')
    .insert({
      name:name.toLowerCase().replaceAll(" ","_"),
      type:type.toLowerCase().replaceAll(" ","_"),
      age:age
    })
    .then(res.status(200).send(`${name} added!`))
    .catch(err => res.status(404).send(err))
})

router.post('/add_plant', (req, res)=>{
  const {edible, name, location, bucket} = req.body
  knex('plants')
    .insert({
      edible:edible,
      name:name.toLowerCase().replaceAll(" ","_"),
      location:location.toLowerCase().replaceAll(" ","_"),
      bucket:bucket
    })
    .then(res.status(200).send(`${name} added!`))
    .catch(err => res.status(404).send(err))
})

router.post('/add_human', (req, res)=>{
  const {type, name, nick_name} = req.body
  knex('humans')
    .insert({
      type:type.toLowerCase().replaceAll(" ","_"),
      name:name.toLowerCase().replaceAll(" ","_"),
      nick_name:nick_name.toLowerCase().replaceAll(" ","_"),
      rating:10,
      do_list:{},
      done_list:{},
      allowance_earned:0
    })
    .then(res.status(200).send(`${name} added!`))
    .catch(err => res.status(404).send(err))
})



module.exports = router;