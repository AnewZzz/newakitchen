const DotEnv = require('dotenv');

DotEnv.config();

const env = process.env.NODE_ENV;

const defaultConfig = {
  db: process.env.DB,
  secret: process.env.APP_SECRET,
  jwtDuration: process.env.JWT_DURATION,
  saltRounds: process.env.SALT_ROUNDS,
  secretKey: process.env.SECRET_KEY,
  apiKey: process.env.API_KEY,
};

const CONFIG = {
  development: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig,
  },
};

module.exports = CONFIG[env];
