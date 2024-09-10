// USING NODEMAILER AND MAILTRAP
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// async function main(to) {
//   const transporter = nodemailer.createTransport({
//     host: 'sandbox.smtp.mailtrap.io',
//     secure: false,
//     port: '587',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PWD,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: 'onboarding@resend.dev',
//     to,
//     subject: 'Hello World',
//     html: '<strong>This is test mail!</strong>',
//   });

//   console.log('Message sent: %s', info.messageId);
// }

// // Call the main function with the custom email address
// main('customuser@example.com').catch(console.error);

// USING RESEND
// const axios = require('axios');

// require('dotenv').config();

// async function main(to) {
//   const data = {
//     from: 'onboarding@resend.dev',
//     to,
//     subject: 'Hello World',
//     html: '<strong>This is a test mail!</strong>',
//   };

//   try {
//     const response = await axios.post('https://api.resend.com/emails', data, {
//       headers: {
//         Authorization: `Bearer ${'re_iuXPJXAu_87EVzEAU1PbNTMJPPjJTt6rA'}`, //resend api key
//         'Content-Type': 'application/json',
//       },
//     });
//     console.log('Message sent: %s', response.data.id);
//   } catch (error) {
//     console.error('Error sending email', error);
//   }
// }

// // Call the main function with the custom email address
// main('raghavthapa7@gmail.com').catch(console.error);

// USING MAILGUN

// const mailgun = require('mailgun-js');

// require('dotenv').config();

// async function main(to) {
//   const mg = mailgun({
//     apiKey: 'b2e9debefd23b78cc22e264598483db6-2b755df8-16458e08', //mailgun api key
//     domain: 'sandbox0d3cd961faa9440cb82ba4539b7a82f9.mailgun.org', //mailgun domain
//   });

//   const data = {
//     from: 'onboarding@resend.dev', // Use the email address you verified with Mailgun
//     to,
//     subject: 'Hello World',
//     html: '<strong>This is a test mail!</strong>',
//   };

//   try {
//     const response = await mg.messages().send(data);
//     console.log('Message sent: %s', response.id);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // Call the main function with the custom email address
// main('raghavthapa7@gmail.com').catch(console.error);

// USING GMAIL SMTP

const DotEnv = require('dotenv');

const nodemailer = require('nodemailer');

DotEnv.config();

async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail app password
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER_NAME,
    to,
    subject,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
