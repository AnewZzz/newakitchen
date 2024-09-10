const mongoose = require('mongoose');
const Kitchen = require('../modules/kitchen/model');
const config = require('.');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('kitchen').drop();
    console.log('kitchen collection dropped');

    const kitchens = [
      {
        name: 'Kitchen A',
        designated_printer: '192.168.1.1',
      },
      {
        name: 'Kitchen B',
        designated_printer: '192.168.1.2',
      },
    ];

    await Promise.all(kitchens.forEach(item => Kitchen.create(item)));

    console.log('Kitchens added');
  },
};

setup.initialize();
