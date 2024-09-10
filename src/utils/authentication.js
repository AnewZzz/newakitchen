const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config');

function generateToken(data) {
  try {
    const token = jwt.sign(data, CONFIG.secret, {
      expiresIn: CONFIG.jwtDuration,
    });
    return token;
  } catch (err) {
    throw Boom.badRequest('Could not generate token. Try again later');
  }
}

async function decodeToken(bearerToken) {
  try {
    const splitString = bearerToken.split('Bearer ');
    const decoded = jwt.verify(splitString[1], CONFIG.secret);
    return decoded;
  } catch (err) {
    throw Boom.badRequest('Could not decode token');
  }
}
module.exports = {
  generateToken: data => generateToken(data),
  decodeToken: token => decodeToken(token),
};
