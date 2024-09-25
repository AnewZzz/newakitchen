const mongoose = require('mongoose');

const commonSchema = require('../../helpers/schema');
const { ObjectId } = mongoose.Schema;


const schema = {
  message: { type: String, required: true },
  initiator: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  ...commonSchema,
};

const notificationSchema = mongoose.Schema(schema, {
  collection: 'notification',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const notification = mongoose.model('Notification', notificationSchema);
module.exports = notification;
