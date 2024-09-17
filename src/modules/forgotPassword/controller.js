const axios = require('axios');
const Boom = require('@hapi/boom');
const mongoose = require('mongoose');
const CONFIG = require('../../config');
const ForgotPasswordModel = require('./model');
const Secure = require('../../utils/hash');
const { encryptPassword } = require('../../helpers/encryptPassword');

const ForgotPasswordController = {
  async add(req) {
    const to = req.params.email; // Use req.query for GET request query parameters in GET requests
    if (!to) {
      throw Boom.badRequest("Email can't be blank");
    }
  
    // Fetch the user from the database based on the email
    const user = await mongoose.connection.collection('users').findOne({ email: to });
    console.log(user)
    // Check if user exists and if the user is an admin
    if (!user) {
      throw Boom.badRequest("User not found");
    } else if (user.role !== 'Admin') {
      throw Boom.forbidden("Request Admin to change password.");
    }
  
    const pin = Math.floor(1000 + Math.random() * 9000);
  
    try {
      // Save the pin to the database
      const passUser = await ForgotPasswordModel.findOneAndUpdate(
        { user: user._id },
        { $set: { pin: pin } }
      ); // Save the user reference (user ID)

      if(!passUser){
        await ForgotPasswordModel.create({pin: pin, user: user._id})
      }
  
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
  
  async resetPassword(req) {
    const { pin, newPassword } = req.payload;
    try {
      // Find the pin in the database
      const currPin = await ForgotPasswordModel.findOne({ pin: pin });
      console.log(currPin.user._id)
      // If pin is not found, throw an error
      if (String(currPin['pin']).trim() !== String(pin).trim()) {
        console.log(pin === currPin['pin'])
        return Boom.badRequest('Incorrect pin provided');
      }

      // // Delete the pin after verification
      // if (currPin) {
      //   await mongoose.connection.collection('forgotPasswords').drop();
      //   return { data: 'Pin matched successully' };
      // }
      // Return a success response
    
      const user = await mongoose.connection.collection('users').findOne(
        { _id: currPin.user._id } // Convert to ObjectId if it's a string
      );
      
      if(!user){
        throw Boom.notFound('User not registered ');
      }
      const hash = await Secure.generateHash(newPassword);
      const password = hash;
      user.password = password
      user.user_password = encryptPassword(password)
      user.save
      return {data: "Password reset successfull."}
    } catch (error) {
      // Handle any other errors
      console.error('Error matching pin:', error);
      return Boom.badRequest('An error occurred while matching the pin');
    }
  },
};

module.exports = {
  ForgotPasswordController,
  add: req => ForgotPasswordController.add(req),
  resetPassword: req => ForgotPasswordController.resetPassword(req),
};
