'use strict'

const express = require('express')
const router = express.Router();
const { validateFib } = require('../validator')
const { getFibNum } = require('../controller')


router.get("/health", function (req, res) {
  res.status(200).send({ status: 'OK' });
})

router.get("/fibonacci/:index",validateFib ,function (req, res) {
    getFibNum(req, res)
})



module.exports = router