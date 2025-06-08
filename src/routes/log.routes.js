const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, logController.getAllLogs);
router.get('/filter', authMiddleware, logController.getFilterLogs);

module.exports = router;
