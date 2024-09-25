const Joi = require('joi');

module.exports = {
  create: {
    payload: Joi.object({
      message: Joi.string().required(),
    }),
  },
};