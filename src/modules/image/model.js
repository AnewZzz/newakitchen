const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');

const schema = {
  name: { type: String, required: true },
  ...commonSchema,
};

const imageSchema = mongoose.Schema(schema, {
  collection: 'image',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Image', imageSchema);
