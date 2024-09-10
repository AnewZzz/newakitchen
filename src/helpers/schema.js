const { ObjectId } = require('mongoose').Schema;

module.exports = {
  isActive: { type: Boolean, required: true, default: true },
  createdBy: { type: ObjectId, ref: 'User' },
  updatedBy: { type: ObjectId, ref: 'User' },
};
