'use strict'

const express = require('express')
const router = express.Router();
const {validateFib} = require('../validator')
const {getFibNum} = require('../controller')
const redis = require('redis');
const client = redis.createClient({legacyMode: true});
const cors = require('cors')


router.get("/health", function (req, res) {
  res.status(200).send({ status: 'OK' });
})

 client.on('connect', function() {
  console.log('Connected!');
});
router.use(express.urlencoded({ extended: true}));
router.use(cors());


router.get("/fibonacci/:index", function (req, res, next) {
    validateFib(req, res, next),
    client.get(req.params.index, async (err, data) => {
      if (data) {
         return res.status(200).send({
          error: false,
          message: `Data for ${index} from the cache`,
          number: JSON.parse(data)
        })
      }
      else { 
        getFibNum(req, res)
        return res.status(200).send({
          error: false,
          message: `Data for ${index} from the server`,
          number: data
        })
    }
  }) 
})



module.exports = router