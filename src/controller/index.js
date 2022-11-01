'use strict'
const { FibSchema } = require('../schema/schema');
const {getReqId}= require('../general/general');
const redis = require('redis');
const client = redis.createClient({legacyMode: true});

client.on('connect', function() {
    console.log('Connected!'); // Connected!
  });

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

async function getFibNum (req,res) {
    try{
        const data = fib(req.params.index).toString()
        if(data){
            client.SETEX('index', req.params.index, DEFAULT_EXPIRATION, function(err, reply){
        //client.set('index', req.params.index, 'number', data , function(err, reply) {
                console.log(reply); 
        });
        res.status(200).send({ number: data})}
        await getReqDetails(req)
    }
    catch(e){
        console.log(e)
        res.status(404).send({ message: "Failed to generate fibonacci number"})
    }
}

async function getReqDetails(req){
    try{
        let userInfoObj = new FibSchema({
            indexNum: req.params.index,
            createdAt: new Date(),
            IPAddress: req.socket.localAddress,
            reqId: getReqId()
        })
        await userInfoObj.save()
        return { message:"db stored" }
    }
    catch(e){
        console.log(e)
        return { message: "failed to get store details in database"}
    }
}


module.exports = { getFibNum }