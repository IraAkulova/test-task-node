import * as nodemailer from 'nodemailer';

function sendEmail(dto, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to: dto.email,
    subject: 'New User Registration',
    text: `A new user has registered with the email: ${dto.email}`,
    html: `<a target="_blank" href="${process.env.BASE_URL}auth/email-verification/?token=${token}">Click here to verify your email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

export default sendEmail;
