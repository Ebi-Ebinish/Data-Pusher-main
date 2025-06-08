const { Account, Destination, Log } = require('../models');
const { enqueueDataJob } = require('../queues/dataQueue');

exports.handleIncomingData = async (req, res, next) => {
  try {
    const token = req.headers['cl-x-token'];
    const eventId = req.headers['cl-x-event-id'];
    const body = req.body;

    if (!token || !eventId) return res.status(400).json({ success: false, message: 'Missing headers' });

    const account = await Account.findOne({ where: { app_secret_token: token } });
    if (!account) return res.status(401).json({ success: false, message: 'Invalid token' });

    await enqueueDataJob({ eventId, accountId: account.id, data: body });
    res.json({ success: true, message: 'Data received' });
  } catch (err) {
    next(err);
  }
};