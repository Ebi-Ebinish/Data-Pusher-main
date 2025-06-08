/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account management APIs
 */

/**
 * @swagger
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sample Account
 *               description:
 *                 type: string
 *                 example: This is a test account
 *     responses:
 *       201:
 *         description: Account created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of accounts
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/filter:
 *   get:
 *     summary: Get accounts with filters
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by account name
 *     responses:
 *       200:
 *         description: Filtered accounts
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /accounts/{id}:
 *   put:
 *     summary: Update an account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Account updated
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */

/**
 * @swagger
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Account not found
 */

const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const { accountValidation } = require('../validators/accountValidator');
const validate = require('../middlewares/validate');

router.post('/', authMiddleware, accountValidation, validate, accountController.createAccount);
router.get('/', authMiddleware, accountController.getAccounts);
router.get('/filter', authMiddleware, accountController.getFilterAccounts);
router.put('/:id', authMiddleware, accountValidation, validate, accountController.updateAccount);
router.delete('/:id', authMiddleware, accountController.deleteAccount);

module.exports = router;
