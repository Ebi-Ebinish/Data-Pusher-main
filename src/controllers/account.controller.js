const { Account } = require('../models');

exports.createAccount = async (req, res) => {
  try {
    const { account_name, website } = req.body;
    const account = await Account.create({
      account_name,
      website,
      app_secret_token: require('crypto').randomBytes(16).toString('hex'),
      created_by: req.user.id,
      updated_by: req.user.id
    });
    res.status(201).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAccounts = async (req, res) => {
  const accounts = await Account.findAll();
  res.json({ success: true, data: accounts });
};

exports.getFilterAccounts = async (req, res) => {
  try {
    const { account_name, status } = req.query;
    const where = {};

    if (account_name) where.account_name = account_name;
    const accounts = await Account.findAll({ where });
    res.json({ success: true, data: accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.updateAccount = async (req, res) => {
  const { id } = req.params;
  const [updated] = await Account.update(req.body, {
    where: { id },
  });
  if (updated) {
    const updatedAccount = await Account.findByPk(id);
    return res.json({ success: true, data: updatedAccount });
  }
  res.status(404).json({ success: false, message: 'Account not found' });
};

exports.deleteAccount = async (req, res) => {
  const { id } = req.params;
  const deleted = await Account.destroy({ where: { id } });
  if (deleted) return res.json({ success: true, message: 'Account deleted' });
  res.status(404).json({ success: false, message: 'Account not found' });
};
