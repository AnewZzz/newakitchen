const mongoose = require('mongoose');
const Customer = require('../modules/customer/model');
const config = require('.');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('customers').drop();
    console.log('kitchen collection dropped');

    const customers = [];
    Array.from({ length: 30 }, (_, i) => i + 1).map(number =>
      customers.push({
        name: `Customer ${number}`,
        contact: `98137024${number}`,
      })
    );

    await Promise.all(customers.forEach(item => Customer.create(item)));

    console.log('Categories added');
  },
};

setup.initialize();
