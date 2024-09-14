const mongoose = require('mongoose');
const Category = require('../modules/category/model');
const config = require('.');
const { FOOD_CATEGORIES } = require('../constants/enums');

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');
    await mongoose.connection.collection('categories').drop();
    console.log('categories collection dropped');

    await Promise.all(
      Object.values(FOOD_CATEGORIES).map(async cat => {
        const payload = {
          name: cat,
        };
        return Category.create(payload);
      })
    );

    console.log('Categories added');
  },
};

setup.initialize();
