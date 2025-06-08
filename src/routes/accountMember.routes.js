const express = require('express');
const router = express.Router();
const controller = require('../controllers/accountMember.controller');
const auth = require('../middlewares/authMiddleware');
const { accountMemberValidation } = require('../validators/accountMemberValidator');
const validate = require('../middlewares/validate');
// Create a new account member (Admin only)
router.post('/', auth,accountMemberValidation,validate, controller.createAccountMember);

// Get all account members
router.get('/', auth, controller.getAccountMembers);

// Get members by account ID
router.get('/account/:accountId', auth, controller.getMembersByAccount);

// Update an account member (e.g., role change)
router.put('/:id', auth,accountMemberValidation,validate, controller.updateAccountMember);

// Delete an account member
router.delete('/:id', auth, controller.deleteAccountMember);

module.exports = router;
