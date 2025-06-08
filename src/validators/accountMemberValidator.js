const { body } = require('express-validator');

exports.accountMemberValidation = [
  body('account_id')
    .isInt()
    .withMessage('Account ID must be a valid integer'),

  body('user_id')
    .isInt()
    .withMessage('User ID must be a valid integer'),

  body('role')
    .isIn(['Admin', 'Normal user'])
    .withMessage('Role must be "Admin" or "Normal user"')
];
