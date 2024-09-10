const mongoose = require('mongoose');
const Role = require('../modules/role/model');
const config = require('.');
const PERMISSIONS = require('../constants/permissions');
const { USER_ROLES } = require('../constants/enums');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('roles').drop();
    console.log('Role collection dropped');

    await Role.create({
      name: USER_ROLES.ADMIN,
      permissions: [...Object.values(PERMISSIONS.ADMIN)],
      is_system: true,
    });
    console.log(' Admin Role Added');

    await Role.create({
      name: USER_ROLES.RECEPTIONIST,
      permissions: [...Object.values(PERMISSIONS.RECPTIONIST)],
      is_system: true,
    });

    console.log(' Receptionist Role Added');

    await Role.create({
      name: USER_ROLES.COOK,
      permissions: [...Object.values(PERMISSIONS.COOK)],
      is_system: true,
    });
    console.log(' Cook Role Added');
  },
};

setup.initialize();
