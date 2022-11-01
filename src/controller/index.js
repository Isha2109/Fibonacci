'use strict'

async function getFibNum (req, res) {
    const { index } = req.params
    console.log({ index })
    res.status(200).send(index)
}

module.exports = { getFibNum }