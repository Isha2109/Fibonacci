const { check, validationResult } = require('express-validator')

async function validateFib(req, res, next) {
    check('index').isNumeric()
    check('index').isEmpty()
    check('index').isInt({ min:1})
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
     next()
}

module.exports = { validateFib }