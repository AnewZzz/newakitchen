const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const commonSchema = require('../../helpers/schema');
const { ENUMS, USER_ROLES } = require('../../constants/enums');

const schema = {
  name: { type: String, required: true },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true,
    },
    default: null,
    required: false,
  },
  role: {
    type: String,
    enums: [...ENUMS.user_roles],
    default: USER_ROLES.COOK,
  },
  contact: {
    type: String,
    index: {
      unique: true,
      sparse: true,
    },
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  user_password: {
    type: String,
    required: true,
  },
  // deviceToken: {
  //   type: String,
  //   default: null,
  // },
  designated_kitchen: {
    type: ObjectId,
    ref: 'Kitchen',
    required: false,
  },
  isArchived: { type: Boolean, default: false },
  ...commonSchema,
};

const userSchema = mongoose.Schema(schema, {
  collection: 'users',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      const res = ret;
      delete res.password;
      return res;
    },
  },
});

module.exports = mongoose.model('User', userSchema);
