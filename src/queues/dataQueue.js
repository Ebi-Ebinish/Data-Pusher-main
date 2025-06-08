const Queue = require('bull');
const axios = require('axios');
const { Destination, Log } = require('../models');

const dataQueue = new Queue('dataQueue', { redis: { host: '127.0.0.1', port: 6379 } });

exports.enqueueDataJob = async (jobData) => {
  await dataQueue.add(jobData);
};

dataQueue.process(async (job) => {
  const { eventId, accountId, data } = job.data;
  const destinations = await Destination.findAll({ where: { account_id: accountId } });

  for (const dest of destinations) {
    const headers = JSON.parse(dest.headers);
    try {
      await axios({
        method: dest.method,
        url: dest.url,
        headers,
        data,
      });
      await Log.create({ event_id: eventId, account_id: accountId, destination_id: dest.id, received_data: JSON.stringify(data), status: 'success' });
    } catch (error) {
      await Log.create({ event_id: eventId, account_id: accountId, destination_id: dest.id, received_data: JSON.stringify(data), status: 'failed' });
    }
  }
});
