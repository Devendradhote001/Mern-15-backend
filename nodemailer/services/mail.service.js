const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ddhote780@gmail.com",
    pass: "fdtunothcmyozjpd",
  },
});

const sendMail = async (to, subject, html) => {
  const options = {
    to,
    subject,
    html,
  };

  return await transporter.sendMail(options);
};

module.exports = sendMail;
