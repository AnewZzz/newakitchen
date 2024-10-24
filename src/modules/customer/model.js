const mongoose = require('mongoose');
const commonSchema = require('../../helpers/schema');
const { ObjectId } = mongoose.Schema;


const schema = {
  name: { type: String, require: true },
  contact: {
    type: String,
    index: {
      unique: true,
      sparse: true,
    },
    default: null,
    required: false,
  },
  photo: { type: ObjectId, ref: 'Image'},
  color: {type: String},
  pinned: {type: Boolean, default: false},
  isArchived: { type: Boolean, default: false },
  ...commonSchema,
};

const customerSchema = mongoose.Schema(schema, {
  collection: 'customers',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Customer', customerSchema);
