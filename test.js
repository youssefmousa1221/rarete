require('dotenv').config();
const nodemailer = require('nodemailer');

const t = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

t.sendMail({
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: 'Test',
  text: 'Test email from Rarete'
}, (err, info) => {
  if (err) console.log('ERROR:', err.message);
  else console.log('SUCCESS:', info.response);
});