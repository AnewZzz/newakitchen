const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: { type: String, require: true, unique: true },
  isArchived: { type: Boolean, default: false },
  ...commonSchema,
};

const foodSchema = mongoose.Schema(schema, {
  collection: 'flavour',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Flavour', foodSchema);
