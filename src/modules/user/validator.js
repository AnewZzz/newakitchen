const Joi = require('joi');
const { USER_ROLES } = require('../../constants/enums');

module.exports = {
  add: {
    payload: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().optional(),
      contact: Joi.string().required(),
      password: Joi.string().optional(),
      user_password: Joi.string().optional(),
      deviceToken: Joi.string().optional().allow(null, ''),
      role: Joi.string().optional(),
      designated_kitchen: Joi.string().optional(),
    }),
  },
  deleteUser: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  getUserById: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  updateUser: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    payload: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().optional().allow(''),
      contact: Joi.string().optional(),
      role: Joi.string()
        .valid(USER_ROLES.ADMIN, USER_ROLES.COOK, USER_ROLES.RECEPTIONIST)
        .optional(),
      designated_kitchen: Joi.string().optional(),
      isArchived: Joi.boolean().optional(),
      isActive: Joi.boolean().optional(),
    }),
  },
  login: {
    payload: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
      deviceToken: Joi.string().required(),
    }),
  },
  logout: {
    payload: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
