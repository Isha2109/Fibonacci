
const redis = require('redis')
const { redisConfig } = require('../config/index')

let redisConn

async function getRedisConnection() {
    if (redisConn) return redisConn
    redisConn = redis.createClient({
        host: redisConfig.host,
        port: redisConfig.port
    })

    await redisConn.connect();
    redisConn.on('connect', function() {
        console.log('Redis Connection SuccessFul Connected'); // Connected!
    })
    return redisConn
}

module.exports = {
    getRedisConnection
}