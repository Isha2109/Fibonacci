'use strict'

require(`dotenv`).config()

module.exports = {
    server : {
        port: process.env.PORT
    },
    database:{
        dbUrl:process.env.URL
    }
}