const mongoose = require('mongoose');
const User = require('../modules/user/controller');
const config = require('.');
const { USER_ROLES } = require('../constants/enums');
const { encryptPassword } = require('../helpers/encryptPassword');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('users').drop();
    console.log('User collection dropped');
    const payload = {
      name: 'admin',
      email: 'admin',
      contact: '9808000000',
      role: USER_ROLES.ADMIN,
      password: '1234567890',
      user_password: encryptPassword('1234567890'),
      // deviceToken: '',
    };
    await User.add({
      payload,
    });
    console.log(`${payload.name} added as user`);
  },
};

setup.initialize();
