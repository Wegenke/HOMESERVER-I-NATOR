// Server Info
require('dotenv').config()
const ENV = process.env.ENV 
const knex = require('knex')(require('../knexfile.js')[ENV])



const PORT = process.env.SERVER_PORT

// Express Info
const express = require('express')
const app = express();
app.use(express.json());

// Extra Imports
const cors = require('cors')
require('dotenv').config()

//Express MicroServices
const getRouter = require('./expressRouters/getRouter')
const postRouter = require('./expressRouters/postRouter')
const typesRouter = require('./expressRouters/typesRouter')

// App Uses
app.use(cors())
app.use(express.json())
app.use('/get',getRouter)
app.use('/post',postRouter)
app.use('/api/types',typesRouter(knex))

// Express Listen Info
app.listen(PORT, ()=> {
  console.log(`Your Express application is spun up!`)
})

// Back-End Home End-Point
app.get('/', (request, response) => {
  response.send('This is your HomeApp base!')
})

