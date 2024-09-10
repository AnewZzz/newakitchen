const Joi = require('joi');

module.exports = {
  create: {
    payload: Joi.object({
      name: Joi.string().required(),
      designated_printer: Joi.string().required(),
      isPrimary: Joi.boolean().required(),
      isSecondary: Joi.boolean().required(),
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
      name: Joi.string().optional(),
      designated_printer: Joi.string().optional(),
      isPrimary: Joi.boolean().optional(),
      isSecondary: Joi.boolean().optional(),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
