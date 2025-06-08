const { Destination } = require('../models');

exports.createDestination = async (req, res) => {
  try {
    const { account_id, url, http_method, headers } = req.body;

    const destination = await Destination.create({
      account_id,
      url,
      method:http_method,
      headers,
      created_by: req.user.id,
      updated_by: req.user.id,
    });

    return res.status(201).json({ success: true, data: destination });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.findAll();
    return res.json({ success: true, data: destinations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// controllers/destination.controller.js
exports.getFilterDestinations = async (req, res) => {
  try {
    const {http_method, account_id } = req.query;
    const where = {};

    if (http_method) where.method = http_method;
    if (account_id) where.account_id = account_id;

    const destinations = await Destination.findAll({ where });
    res.json({ success: true, data: destinations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getDestinationsByAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const destinations = await Destination.findAll({ where: { account_id: accountId } });
    return res.json({ success: true, data: destinations });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Destination.update(req.body, { where: { id } });

    if (updated) {
      const updatedDest = await Destination.findByPk(id);
      return res.json({ success: true, data: updatedDest });
    }

    return res.status(404).json({ success: false, message: 'Destination not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Destination.destroy({ where: { id } });

    if (deleted) {
      return res.json({ success: true, message: 'Destination deleted' });
    }

    return res.status(404).json({ success: false, message: 'Destination not found' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
