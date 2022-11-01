'use strict'

require(`dotenv`).config()

console.log(process.env.PORT)

module.exports = {
    server : {
        port: process.env.PORT
    }
}