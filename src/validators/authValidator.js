const { body } = require('express-validator');

exports.registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];
