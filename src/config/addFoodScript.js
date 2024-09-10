const mongoose = require('mongoose');
const Food = require('../modules/food/model');

const config = require('.');

const cats = ['6271eae50fd340004d3219c4', '6271eaf20fd340004d3219c9'];
const kitchens = [
  '625edc2089effa90ef5c7be2',
  '625edc2089effa90ef5c7be3',
  '62ab529cf6da4f7a5c61d0ec',
];

const setup = {
  initialize: async () => {
    await mongoose.connect(config.db);
    console.log('db-connected');

    const food = [];
    for (let i = 0; i < 20; i++) {
      const randomKit = Math.floor(Math.random() * kitchens.length);
      const kitchen = kitchens[randomKit];

      const randomCat = Math.floor(Math.random() * cats.length);
      const category = cats[randomCat];

      let name = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

      for (let k = 0; k < characters.length; k++) {
        name += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      food.push({
        name,
        category,
        preferredKitchen: kitchen,
      });
    }

    await Promise.all(
      food.forEach(async item => {
        await Food.create(item);
      })
    );

    console.log('food added');
  },
};

setup.initialize();
