const cron = require('node-cron');
const mongoose = require('mongoose');
const config = require('.');

const cronjob = () => {
  cron.schedule('0 0 * * *', async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('orders').drop();

    console.log(`${new Date().toLocaleDateString()} Orders cleared!`);
  });
};

module.exports = cronjob;
