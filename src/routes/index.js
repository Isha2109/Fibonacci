'use strict'

const express = require('express')
const router = express.Router();
const {validateFib} = require('../validator')
const {getFibNum} = require('../controller')

router.get("/health", function (req, res) {
  res.status(200).send({ status: 'OK' });
})

router.get("/fibonacci/:index", function (req, res, next) {
    validateFib(req, res, next),
    getFibNum(req,res)
})

module.exports = router