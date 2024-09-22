const mongoose = require('mongoose');
const Order = require('../modules/order/model');
const config = require('.');
const { ENUMS } = require('../constants/enums');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('orders').drop();
    const user = await mongoose.connection.collection('users').findOne({}, { _id: 1 });

    const orders = [
      {
        recipient: "recipient_1",
        recipientType: ENUMS.recepient_type[0],
        initiator: user._id,
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
        recipient: "recipient2",
        recipientType: ENUMS.recepient_type[1],
        orderNumber: 2,
        initiator: user._id,
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
        recipient: 'recipient_3',
        recipientType: ENUMS.recepient_type[1],
        orderNumber: 3,
        initiator: user._id,
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

    await Promise.all(orders.map(item => Order.create(item)));
    console.log('orders added');
  },
};

setup.initialize();
