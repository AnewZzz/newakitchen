const mongoose = require('mongoose');
const Order = require('../modules/order/model');
const config = require('.');
const { ENUMS } = require('../constants/enums');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('orders').drop();

    const orders = [
      {
        recipientType: ENUMS.recepient_type[0],
        orderNumber: 1,
        items: [
          {
            food: 'Jhol Momo',
            quantity: 2,
            flavor: ['--oil', '++spicy'],
            isPackaged: false,
          },
        ],
        isPrinted: true,
      },
      {
        recipientType: ENUMS.recepient_type[1],
        orderNumber: 2,
        items: [
          {
            food: 'Veg Momo',
            quantity: 3,
            flavor: ['--oil', '++spicy'],
            isPackaged: true,
          },
        ],
        isPrinted: true,
      },
      {
        recipientType: ENUMS.recepient_type[1],
        orderNumber: 3,
        items: [
          {
            food: 'Chickhen Momo',
            quantity: 1,
            flavor: ['--oil', '++spicy'],
            isPackaged: false,
          },
        ],
        isPrinted: true,
      },
    ];
    console.log({ orders });

    await Promise.all(orders.forEach(item => Order.create(item)));

    console.log('orders added');
  },
};

setup.initialize();
