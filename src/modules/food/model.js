const mongoose = require('mongoose');

const commonSchema = require('../../helpers/schema');

const { ObjectId } = mongoose.Schema;

const schema = {
  name: { type: String, require: true },
  category: { type: ObjectId, ref: 'Category', required: true },
  preferredKitchen: {
    type: ObjectId,
    ref: 'Kitchen',
    required: false,
  },
  flavorTags: [{ type: String }],
  isArchived: { type: Boolean, default: false },
  photo: { type: ObjectId, ref: 'Image', required: false },
  ...commonSchema,
};

const foodSchema = mongoose.Schema(schema, {
  collection: 'food',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Food', foodSchema);
