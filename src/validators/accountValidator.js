const { body } = require('express-validator');

exports.accountValidation = [
  body('account_name')
    .notEmpty()
    .withMessage('Account name is required'),
];
