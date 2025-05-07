const { ObjectId } = require('mongodb');
const db = require('../configs/dbConfigs').getDb();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/envConfigs');
const sendEmail = require('../utils/sendEmail'); // adjust path if needed

exports.addContact = async (data) => {
  const { name, email, phone, message } = data;

  const subject = 'New Contact Form Submission';
  const body = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong><br/>${message}</p>
  `;

  try {
    await sendEmail('ipaeduacademy@gmail.com', subject, body);
    return {
      status: 201,
      data: { message: 'Message sent successfully!' },
    };
  } catch (err) {
    return {
      status: 500,
      data: { message: `Failed to send email: ${err.message}` },
    };
  }
};
