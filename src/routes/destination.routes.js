const express = require('express');
const router = express.Router();
const controller = require('../controllers/destination.controller');
const auth = require('../middlewares/authMiddleware');
const { destinationValidation } = require('../validators/destinationValidator');
const validate = require('../middlewares/validate');

router.post('/', auth,destinationValidation,validate, controller.createDestination);
router.get('/', auth, controller.getDestinations);
router.get('/filter', auth, controller.getFilterDestinations);
router.get('/account/:accountId', auth, controller.getDestinationsByAccount);
router.put('/:id', auth, destinationValidation,validate,controller.updateDestination);
router.delete('/:id', auth, controller.deleteDestination);

module.exports = router;
