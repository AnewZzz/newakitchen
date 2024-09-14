const axios = require('axios');
const Boom = require('@hapi/boom');
const mongoose = require('mongoose');
const CONFIG = require('../../config');
const ForgotPasswordModel = require('./model');

const ForgotPasswordController = {
  async add() {
    const to = 'bijaydongol377@gmail.com'; // Use req.query for GET request query parameters
    if (!to) {
      throw Boom.badRequest("Email can't be blank");
    }

    const pin = Math.floor(1000 + Math.random() * 9000);

    try {
      // Save the pin to the database
      await ForgotPasswordModel.create({ pin });
      // Prepare email data
      const data = {
        from: 'onboarding@resend.dev',
        to,
        subject: 'Forgot Password',
        html: `${pin} is your pin to reset your password.`,
      };
      // Send email using Resend API
      const response = await axios.post('https://api.resend.com/emails', data, {
        headers: {
          Authorization: `Bearer ${CONFIG.apiKey}`, // Resend API key
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        return { data: 'Mail sent successfully' };
      }
    } catch (error) {
      console.log(error);
      throw Boom.badRequest('Error sending email');
    }
  },

  async matchPin(req) {
    const { pin } = req.payload;
    try {
      // Find the pin in the database
      const currPin = await ForgotPasswordModel.findOne({ pin }).exec();

      // If pin is not found, throw an error
      if (!currPin) {
        return Boom.badRequest('Incorrect pin');
      }

      // Delete the pin after verification
      if (currPin) {
        await mongoose.connection.collection('forgotPasswords').drop();
        return { data: 'Pin matched successully' };
      }
      // Return a success response
    } catch (error) {
      // Handle any other errors
      console.error('Error matching pin:', error);
      return Boom.internal('An error occurred while matching the pin');
    }
  },
};

module.exports = {
  ForgotPasswordController,
  add: req => ForgotPasswordController.add(req),
  matchPin: req => ForgotPasswordController.matchPin(req),
};
