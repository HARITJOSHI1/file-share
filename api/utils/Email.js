const nodemailer = require("nodemailer");
const User = require("../models/UserModel");

module.exports = class Email {
  constructor(ffile, file) {
    this.file = file;
    this.ffile = ffile;
  }

  async init () {
    this.user = await User.findById({ _id: this.file.userId });
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(subject) {
    await this.init();
    const mailOptions = {
      from: this.user.from,
      to: this.user.sendTo,
      subject,
      text: this.user.message
    };

    this.newTransport().sendMail(mailOptions);
  }
};
