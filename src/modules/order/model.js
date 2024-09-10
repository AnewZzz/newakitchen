const mongoose = require('mongoose');

const { ENUMS } = require('../../constants/enums');
const commonSchema = require('../../helpers/schema');

const { ObjectId } = mongoose.Schema;

const schema = {
  recipient: { type: mongoose.Schema.Types.Mixed },
  recipientType: { type: String, enums: [...ENUMS.recepient_type] },
  initiator: { type: ObjectId, ref: 'User', required: true },
  items: [
    {
      food: String,
      quantity: String,
      flavor: [String],
      isPackaged: Boolean,
    },
  ],
  remarks: String,
  isPrinted: Boolean,
  isArchived: { type: Boolean, default: false },
  ...commonSchema,
};

const orderSchema = mongoose.Schema(schema, {
  collection: 'orders',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

module.exports = mongoose.model('Order', orderSchema);
