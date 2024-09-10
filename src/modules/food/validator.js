const Joi = require('joi');

module.exports = {
  create: {
    payload: Joi.object({
      name: Joi.string().required(),
      category: Joi.string().required(),
      flavorTags: Joi.array().items(Joi.string().allow('')).optional(),
      preferredKitchen: Joi.string().allow('').optional(),
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
      category: Joi.string().optional(),
      flavorTags: Joi.array().items(Joi.string()).optional(),
      preferredKitchen: Joi.string().optional().allow(''),
      photo: Joi.string().optional(),
    }),
  },
  getById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
