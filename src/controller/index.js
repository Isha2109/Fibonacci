'use strict'
const { FibSchema } = require('../schema/schema');
const { getReqId }= require('../utils/utils');
const { getRedisConnection } = require('../connection/redis')

const DEFAULT_EXPIRATION = 3600

function fib(index) {
    let data
    let num1 = BigInt(0)
    let num2 = BigInt(1)
    let currentNumber;
    let countMax=Math.abs(index)+1;
    let counter=2;
    if(index==0){
      data = num1;
    } 
    else if (index==1||index==-1){
      data = num2;
    }
    while(counter<countMax)
    {
          currentNumber=num1+num2;
          num1=num2;
          num2=currentNumber;
          counter++;
    }
    if((index<0) && (index % 2 ==0))
    {
      data = currentNumber;
    }
    data = currentNumber;
    return data;
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