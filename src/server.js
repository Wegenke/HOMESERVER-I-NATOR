// Server Info
require('dotenv').config()
const PORT = process.env.SERVER_PORT

// Express Info
const express = require('express')
const app = express();

// Extra Imports
const cors = require('cors')
require('dotenv').config()

//Express MicroServices
const getRouter = require('./expressRouters/getRouter')
const postRouter = require('./expressRouters/postRouter')

// App Uses
app.use(cors())
app.use(express.json())
app.use('/get',getRouter)
app.use('/post',postRouter)

// Express Listen Info
app.listen(PORT, ()=> {
  console.log(`Your Express application is spun up!`)
})

// Back-End Home End-Point
app.get('/', (request, response) => {
  response.send('This is your HomeApp base!')
})

