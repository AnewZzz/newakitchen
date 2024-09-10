const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: { type: String, unique: true, required: true },
  designated_printer: { type: String, required: true },
  isPrimary: { type: Boolean },
  isSecondary: { type: Boolean },
  isArchived: { type: Boolean, default: false },
  ...commonSchema,
};

const kitchenSchema = mongoose.Schema(schema, {
  collection: 'kitchen',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Kitchen', kitchenSchema);
