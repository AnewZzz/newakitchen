const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: { type: String, required: true, unique: true },
  permissions: [{ type: String }],
  expiry_date: Date,
  is_system: { type: Boolean, default: false },
  ...commonSchema,
};

const roleSchema = mongoose.Schema(schema, {
  collection: 'roles',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Role', roleSchema);
