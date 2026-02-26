const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ddhote780@gmail.com",
    pass: "aohmmzyprneydoep",
  },
});

const sendMail = async (to, subject, html) => {
  let options = {
    to,
    subject,
    html,
  };

  return await transporter.sendMail(options);
};

module.exports = sendMail;
