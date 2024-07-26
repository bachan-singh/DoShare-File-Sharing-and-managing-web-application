const nodemailer = require("nodemailer");

exports.sendMail = async (req, resp) => {
  const { email, subject, body } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'lexus.franecki@ethereal.email',
        pass: 'agmeYXnUKY1E6Ts9P1'
      }
    });

    let info = await transporter.sendMail({
      from: '"Bachan Singh" <bachan@email.com>',
      to: email, // Dynamic receiver email from the form
      subject: subject,
      text: body,
    });
    
    console.log("Message sent: %s", info.messageId);
    resp.json(info);
  } catch (error) {
    console.error('Error sending email:', error);
    resp.status(500).json({ error: 'Failed to send email' });
  }
};
