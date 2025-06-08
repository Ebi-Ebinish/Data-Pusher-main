const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidation } = require('../validators/authValidator');
const validate = require('../middlewares/validate');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', registerValidation, validate, authController.login);
router.post('/logout', authController.logout);
// Protected route
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ success: true, user: req.user });
  });
module.exports = router;
