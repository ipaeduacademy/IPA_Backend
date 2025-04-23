module.exports = async function sendEmail(to, subject, body) {
    console.log(`Sending email to ${to}:\nSubject: ${subject}\nBody: ${body}`);
    // integrate with SendGrid, SES, etc.
  };
  