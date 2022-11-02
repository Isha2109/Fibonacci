function validateFib(req, res, next) {
    const index = req.params.index
    if(!index || isNaN(Number(index))) return res.status(404).send({ message: 'Validaton Failed' })
    next()
}

module.exports = { validateFib }