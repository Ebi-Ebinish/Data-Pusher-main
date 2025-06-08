const { AccountMember, Role } = require('../models');

exports.createAccountMember = async (req, res) => {
  try {
    const { account_id, user_id, role } = req.body;
    // Find role by name
    const roleRecord = await Role.findOne({ where: { role_name: role } });

    if (!roleRecord) {
      return res.status(400).json({ success: false, message: 'Invalid role name' });
    }

    const member = await AccountMember.create({
      account_id,
      user_id,
      role_id: roleRecord.id,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    return res.status(201).json({ success: true, data: member });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAccountMembers = async (req, res) => {
  try {
    const members = await AccountMember.findAll();
    return res.json({ success: true, data: members });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMembersByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const members = await AccountMember.findAll({ where: { account_id: accountId } });
    return res.json({ success: true, data: members });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateAccountMember = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await AccountMember.update(req.body, { where: { id } });

    if (updated) {
      const updatedMember = await AccountMember.findByPk(id);
      return res.json({ success: true, data: updatedMember });
    }

    return res.status(404).json({ success: false, message: 'Member not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAccountMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AccountMember.destroy({ where: { id } });

    if (deleted) {
      return res.json({ success: true, message: 'Account member deleted' });
    }

    return res.status(404).json({ success: false, message: 'Member not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
