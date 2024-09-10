const Joi = require('joi');

module.exports = {
  add: {
    params: Joi.object({
      email: Joi.string().required(),
    }),
  },

  matchPin: {
    payload: Joi.object({
      pin: Joi.string().required(),
    }),
  },
};
