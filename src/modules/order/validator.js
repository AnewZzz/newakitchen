const Joi = require('joi');

module.exports = {
  create: {
    payload: Joi.object({
      recipient: Joi.any().required(),
      recipientType: Joi.string().required(),
      items: Joi.array(),
      remarks: Joi.string().optional(),
      isPrinted: Joi.boolean().optional(),
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
      recipient: Joi.string().required(),
      recipientType: Joi.string().required(),
      items: Joi.array(),
      remarks: Joi.string().optional(),
      isPrinted: Joi.boolean().optional(),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
