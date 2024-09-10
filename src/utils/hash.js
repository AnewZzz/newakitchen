const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');

const CONFIG = require('../config');

async function generateHash(plainText) {
  const { saltRounds } = CONFIG;
  if (!plainText) throw Boom.notFound();
  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt
        .hash(plainText, parseInt(saltRounds, 10))
        .then(hash => resolve(hash))
        .catch(err => reject(err));
    });
    return hashedPassword;
  } catch (err) {
    throw Boom.badRequest('Auth failed');
  }
}

async function compare(plainText, hash) {
  if (!plainText || !hash) throw Boom.badRequest('Auth failed');
  const isValid = await bcrypt.compare(plainText, hash);
  return isValid;
}

module.exports = {
  generateHash,
  compare,
};
