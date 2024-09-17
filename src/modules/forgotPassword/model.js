const mongoose = require('mongoose');

const commonSchema = require('../../helpers/schema');
const { ObjectId } = mongoose.Schema;


const schema = {
  pin: { type: String, required: true },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  ...commonSchema,
};

const forgotPasswordSchema = mongoose.Schema(schema, {
  collection: 'forgotPasswords',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

const forgotPassword = mongoose.model('ForgotPassword', forgotPasswordSchema);
module.exports = forgotPassword;
