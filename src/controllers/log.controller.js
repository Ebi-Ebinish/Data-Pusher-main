const { Log, Account, Destination } = require('../models');


exports.getFilterLogs = async (req, res) => {
  try {
    const { event_id, status, account_id, destination_id, from, to } = req.query;
    const where = {};

    if (event_id) where.event_id = event_id;
    if (status) where.status = status;
    if (account_id) where.account_id = account_id;
    if (destination_id) where.destination_id = destination_id;
    if (from || to) {
      where.received_timestamp = {};
      if (from) where.received_timestamp[Op.gte] = new Date(from);
      if (to) where.received_timestamp[Op.lte] = new Date(to);
    }

    const logs = await Log.findAll({ where });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getAllLogs = async (req, res, next) => {
  try {
    const { accountId, destinationId, status } = req.query;

    const where = {};
    if (accountId) where.account_id = accountId;
    if (destinationId) where.destination_id = destinationId;
    if (status) where.status = status;

    const logs = await Log.findAll({
      where,
      include: [
        { model: Account, as: 'account', attributes: ['account_name'] },
        { model: Destination, as: 'destination', attributes: ['url'] }
      ],
      order: [['received_timestamp', 'DESC']]
    });

    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};
