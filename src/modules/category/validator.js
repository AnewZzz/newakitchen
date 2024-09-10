const Joi = require('joi');

module.exports = {
  create: {
    payload: Joi.object({
      name: Joi.string().required(),
    }),
  },
  delete: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    payload: Joi.object({
      name: Joi.string().required().error(new Error('Name must be string')),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
