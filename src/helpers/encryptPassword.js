const crypto = require('crypto');
const CONFIG = require('../config');

if (!CONFIG.secretKey) {
  throw new Error('Secret key is not defined in CONFIG');
}

const ENCRYPTION_KEY = Buffer.from(CONFIG.secretKey, 'hex');
const IV_LENGTH = 16; // For AES, this is always 16

function encryptPassword(password) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

module.exports = {
  encryptPassword,
};
