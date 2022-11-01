'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes')

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

const { server } = require('./config')
console.log(server)

app.use(cors())
app.use('/',router)

const { PORT } = server

app.listen(3000, ()=>{
    console.log(`connection open on ${PORT}`)
})


module.exports = app


