const { body } = require('express-validator');

exports.destinationValidation = [
    body('url')
        .notEmpty()
        .withMessage('URL is required'),

    body('http_method')
        .notEmpty()
        .withMessage('HTTP Method is required'),

    body('headers')
        .isObject()
        .withMessage('Headers  is required '),
];
