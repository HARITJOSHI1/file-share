const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, file){
    this.user = user; 
    this.file = file; 
  }
  
  newTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
  }

  async send(template, subject){
    console.log(this.file);
    const mailOptions = {
      from: this.user.email,
      to: this.user.sendTo,
      subject,
      text: template,
    };

    this.newTransport().sendMail(mailOptions);
  }
};