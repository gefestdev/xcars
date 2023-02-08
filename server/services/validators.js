const { body } = require('express-validator/check');


const validators = {
    userValidator:[
    body('email').trim().isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().isLength({ min: 5 }).withMessage('must be at least 5 chars long').matches(/\d/).withMessage('give me numbers')
    ],
    userSigninValidator:[
        body('login').trim(),
        body('password').not().isEmpty().withMessage('Пароль пустой').trim()
    ]
}

module.exports = validators;