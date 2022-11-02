'use strict'
const { FibSchema } = require('../schema/schema');
const { getReqId }= require('../utils/utils');
const { getRedisConnection } = require('../connection/redis')

const DEFAULT_EXPIRATION = 3600

function fib (index) {
    if(index == Math.abs(0) || index == Math.abs(1)) return index
    let n1 = BigInt(0), n2 = BigInt(1), nextTerm = BigInt(0);
    for (let i = 1; i <= Math.abs(index); i++) {
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
    }
    return nextTerm;
}

async function getFibNum (req, res) {
    try{
        const num = req.params.index
        const redisConn = await getRedisConnection()
        let fibNo = await redisConn.get(num)
        if (!fibNo) {
            fibNo = fib(Number(num)).toString()     
            await redisConn.set(num, fibNo, DEFAULT_EXPIRATION)
            await setReqDetails(num, req.socket.localAddress)
        }
        fibNo = Number(num)<0 ? `-${fibNo}` : fibNo
        res.status(200).send({ fibNo })
    }
    catch(e){
        console.log({ e })
        res.status(404).send({ message: "Failed to generate fibonacci number"})
    }
}

async function setReqDetails(fibNo, ip){
    try{
        let userInfoObj = new FibSchema({
            indexNum: fibNo,
            createdAt: new Date(),
            IPAddress: ip,
            reqId: getReqId()
        })
        await userInfoObj.save()
        return { message: "db stored" }
    }
    catch(e){
        console.log(e)
        return { message: "failed to get store details in database"}
    }
}


module.exports = { getFibNum }